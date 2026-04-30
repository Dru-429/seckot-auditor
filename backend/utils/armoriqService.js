const axios = require('axios');

class ArmoriqService {
  constructor() {
    this.apiKey = process.env.ARMORIQ_API_KEY;
    this.baseURL = process.env.ARMORIQ_API_URL || 'https://api.armoriq.com/v1';
  }

  /**
   * Initialize Armoriq SDK
   * In production, you would use the actual Armoriq SDK
   */
  async initializeSDK() {
    try {
      // Placeholder for actual SDK initialization
      console.log('Armoriq SDK initialized');
      return true;
    } catch (error) {
      console.error('Failed to initialize Armoriq SDK:', error);
      throw error;
    }
  }

  /**
   * Validate GitHub URL format
   */
  validateGitHubUrl(url) {
    const githubUrlPattern = /^(https?:\/\/)?(www\.)?github\.com\/[\w-]+\/[\w.-]+\/?$/;
    return githubUrlPattern.test(url);
  }

  /**
   * Extract owner and repo from GitHub URL
   */
  extractRepoInfo(url) {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)\/?$/);
    if (match) {
      return { owner: match[1], repo: match[2] };
    }
    return null;
  }

  /**
   * Trigger security scan via Armoriq
   * Simulates a scan with realistic data
   */
  async triggerScan(githubUrl) {
    try {
      if (!this.validateGitHubUrl(githubUrl)) {
        throw new Error('Invalid GitHub URL format');
      }

      const repoInfo = this.extractRepoInfo(githubUrl);
      const startTime = Date.now();

      // Simulate API call to Armoriq
      // In production, replace with actual Armoriq API call
      const scanResult = await this.simulateScan(repoInfo);

      const scanDuration = Date.now() - startTime;

      return {
        success: true,
        rawReport: scanResult,
        scanDuration,
      };
    } catch (error) {
      console.error('Scan trigger failed:', error);
      throw error;
    }
  }

  /**
   * Simulate Armoriq scan response
   * Returns realistic vulnerability data for demonstration
   */
  async simulateScan(repoInfo) {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        const vulnerabilities = [
          {
            id: 'VULN_001',
            type: 'SQL Injection',
            severity: 'critical',
            file: 'src/api/users.js',
            line: 45,
            description: 'User input not properly sanitized in SQL query',
            recommendation: 'Use parameterized queries or prepared statements',
          },
          {
            id: 'VULN_002',
            type: 'XSS Vulnerability',
            severity: 'high',
            file: 'src/components/Form.jsx',
            line: 120,
            description: 'Unsanitized user input rendered directly in DOM',
            recommendation: 'Use React built-in escaping or DOMPurify',
          },
          {
            id: 'VULN_003',
            type: 'Hardcoded Credentials',
            severity: 'critical',
            file: 'src/config/database.js',
            line: 8,
            description: 'Database credentials hardcoded in source',
            recommendation: 'Use environment variables for sensitive data',
          },
          {
            id: 'VULN_004',
            type: 'Missing CSRF Protection',
            severity: 'high',
            file: 'src/middleware/auth.js',
            line: 35,
            description: 'No CSRF token validation on state-changing requests',
            recommendation: 'Implement CSRF tokens for forms',
          },
          {
            id: 'VULN_005',
            type: 'Weak Password Policy',
            severity: 'medium',
            file: 'src/validators/password.js',
            line: 12,
            description: 'Password validation allows weak passwords',
            recommendation: 'Enforce minimum 12 characters with mixed case',
          },
          {
            id: 'VULN_006',
            type: 'Outdated Dependencies',
            severity: 'medium',
            file: 'package.json',
            line: 1,
            description: 'Several npm packages have known vulnerabilities',
            recommendation: 'Run npm audit and update vulnerable packages',
          },
          {
            id: 'VULN_007',
            type: 'Missing Content-Security-Policy',
            severity: 'low',
            file: 'src/server.js',
            line: 22,
            description: 'CSP header not configured',
            recommendation: 'Add Content-Security-Policy HTTP header',
          },
        ];

        const summary = {
          critical: 2,
          high: 2,
          medium: 2,
          low: 1,
          info: 0,
        };

        resolve({
          repository: repoInfo,
          scanDateTime: new Date().toISOString(),
          totalVulnerabilities: vulnerabilities.length,
          vulnerabilities,
          summary,
          codeQualityMetrics: {
            maintainability: 65,
            reliability: 72,
            security: 45,
            coverage: 68,
          },
        });
      }, 2000); // Simulate 2-second scan
    });
  }

  /**
   * Calculate Secko Security Score based on vulnerability density
   */
  calculateSecurityScore(rawReport) {
    try {
      const vulnerabilities = rawReport.vulnerabilities || [];
      const summary = rawReport.summary || {};

      if (vulnerabilities.length === 0) {
        return 100;
      }

      // Scoring algorithm
      let score = 100;

      // Deduct points based on severity
      score -= (summary.critical || 0) * 20; // 20 points per critical
      score -= (summary.high || 0) * 10; // 10 points per high
      score -= (summary.medium || 0) * 5; // 5 points per medium
      score -= (summary.low || 0) * 2; // 2 points per low
      score -= (summary.info || 0) * 1; // 1 point per info

      // Ensure score is between 0 and 100
      score = Math.max(0, Math.min(100, score));

      return Math.round(score);
    } catch (error) {
      console.error('Error calculating security score:', error);
      return 0;
    }
  }
}

module.exports = new ArmoriqService();
