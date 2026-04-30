const Scan = require('../models/Scan');
const armoriqService = require('../utils/armoriqService');

// Create and trigger a new scan
exports.createScan = async (req, res) => {
  try {
    const { githubUrl } = req.body;
    const userId = req.user.id;

    // Validation
    if (!githubUrl) {
      return res.status(400).json({ message: 'GitHub URL is required' });
    }

    // Validate GitHub URL format
    if (!armoriqService.validateGitHubUrl(githubUrl)) {
      return res.status(400).json({ message: 'Invalid GitHub URL format' });
    }

    // Create scan record with pending status
    let scan = await Scan.create({
      userId,
      githubUrl,
      status: 'scanning',
      rawReport: {},
    });

    res.status(201).json({
      success: true,
      message: 'Scan initiated',
      scan,
    });

    // Trigger scan asynchronously
    triggerScanAsync(scan._id, githubUrl);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating scan',
      error: error.message,
    });
  }
};

// Async function to handle actual scanning
async function triggerScanAsync(scanId, githubUrl) {
  try {
    // Update status to scanning
    await Scan.findByIdAndUpdate(scanId, { status: 'scanning' });

    // Trigger Armoriq scan
    const startTime = Date.now();
    const scanResult = await armoriqService.triggerScan(githubUrl);

    // Calculate security score
    const score = armoriqService.calculateSecurityScore(scanResult.rawReport);

    // Extract and summarize vulnerabilities
    const vulnerabilities = (scanResult.rawReport.vulnerabilities || []).map(
      (vuln) => ({
        type: vuln.type,
        severity: vuln.severity,
        filePath: vuln.file,
        lineNumber: vuln.line,
        description: vuln.description,
      })
    );

    // Update scan with results
    const updatedScan = await Scan.findByIdAndUpdate(
      scanId,
      {
        status: 'completed',
        rawReport: scanResult.rawReport,
        score,
        vulnerabilities,
        summary: scanResult.rawReport.summary,
        scanDuration: scanResult.scanDuration,
      },
      { new: true }
    );

    console.log(`Scan ${scanId} completed with score: ${score}`);
  } catch (error) {
    console.error(`Scan ${scanId} failed:`, error);
    await Scan.findByIdAndUpdate(scanId, {
      status: 'failed',
      errorMessage: error.message,
    });
  }
}

// Get all scans for a user
exports.getUserScans = async (req, res) => {
  try {
    const userId = req.user.id;
    const scans = await Scan.find({ userId }).sort({ createdAt: -1 }).lean();

    res.json({
      success: true,
      scans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching scans',
      error: error.message,
    });
  }
};

// Get single scan by ID
exports.getScanById = async (req, res) => {
  try {
    const { scanId } = req.params;
    const userId = req.user.id;

    const scan = await Scan.findOne({ _id: scanId, userId });

    if (!scan) {
      return res.status(404).json({ message: 'Scan not found' });
    }

    res.json({
      success: true,
      scan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching scan',
      error: error.message,
    });
  }
};

// Get scan status
exports.getScanStatus = async (req, res) => {
  try {
    const { scanId } = req.params;
    const userId = req.user.id;

    const scan = await Scan.findOne({ _id: scanId, userId }).select(
      'status score vulnerabilities summary'
    );

    if (!scan) {
      return res.status(404).json({ message: 'Scan not found' });
    }

    res.json({
      success: true,
      status: scan.status,
      score: scan.score,
      vulnerabilities: scan.vulnerabilities,
      summary: scan.summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching scan status',
      error: error.message,
    });
  }
};

// Delete a scan
exports.deleteScan = async (req, res) => {
  try {
    const { scanId } = req.params;
    const userId = req.user.id;

    const scan = await Scan.findOneAndDelete({ _id: scanId, userId });

    if (!scan) {
      return res.status(404).json({ message: 'Scan not found' });
    }

    res.json({
      success: true,
      message: 'Scan deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting scan',
      error: error.message,
    });
  }
};
