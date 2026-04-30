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
        const repoSeed = this.hashString(`${repoInfo.owner}/${repoInfo.repo}`);
        const countFor = (offset, min, max) => min + ((repoSeed + offset) % (max - min + 1));

        const summary = {
          critical: countFor(11, 0, 3),
          high: countFor(23, 0, 4),
          medium: countFor(37, 0, 5),
          low: countFor(53, 0, 4),
          info: countFor(67, 0, 2),
        };

        const severityTemplates = {
          critical: [
            {
              type: 'SQL Injection',
              description: 'User input is being interpolated directly into a database query.',
              recommendation: 'Use parameterized queries or a safe ORM.',
            },
            {
              type: 'Remote Code Execution',
              description: 'Untrusted data is used when executing system commands.',
              recommendation: 'Validate and sanitize all command inputs.',
            },
          ],
          high: [
            {
              type: 'Cross-Site Scripting',
              description: 'Unescaped user content is rendered inside the page.',
              recommendation: 'Escape output and use a secure template engine.',
            },
            {
              type: 'Broken Authentication',
              description: 'Session or authentication data is not enforced correctly.',
              recommendation: 'Use secure cookies and rotate authentication tokens.',
            },
          ],
          medium: [
            {
              type: 'Weak Password Policy',
              description: 'The password policy allows weak passwords.',
              recommendation: 'Require longer passwords with mixed character types.',
            },
            {
              type: 'Outdated Dependency',
              description: 'A dependency has a known security vulnerability.',
              recommendation: 'Update the dependency to the latest secure version.',
            },
          ],
          low: [
            {
              type: 'Missing Content Security Policy',
              description: 'CSP headers are not configured for the application.',
              recommendation: 'Add a Content-Security-Policy header.',
            },
            {
              type: 'HTTP Compression Misconfiguration',
              description: 'Compression headers are not optimized securely.',
              recommendation: 'Configure gzip and Brotli securely.',
            },
          ],
          info: [
            {
              type: 'Code Style Issue',
              description: 'The repository contains inconsistent formatting.',
              recommendation: 'Run a formatter and linting pass.',
            },
            {
              type: 'Documentation Missing',
              description: 'Some modules are missing inline documentation.',
              recommendation: 'Add comments and README details for key components.',
            },
          ],
        };

        const vulnerabilities = [];
        const addVulnerabilities = (severity, count) => {
          const templates = severityTemplates[severity];
          for (let i = 0; i < count; i += 1) {
            const template = templates[i % templates.length];
            vulnerabilities.push({
              id: `VULN_${severity.toUpperCase()}_${i + 1}`,
              type: template.type,
              severity,
              file: `src/${severity}/${repoInfo.repo}-${i + 1}.js`,
              line: 20 + i * 8,
              description: template.description,
              recommendation: template.recommendation,
            });
          }
        };

        addVulnerabilities('critical', summary.critical);
        addVulnerabilities('high', summary.high);
        addVulnerabilities('medium', summary.medium);
        addVulnerabilities('low', summary.low);
        addVulnerabilities('info', summary.info);

        const totalVulnerabilities = vulnerabilities.length;

        resolve({
          repository: repoInfo,
          scanDateTime: new Date().toISOString(),
          totalVulnerabilities,
          vulnerabilities,
          summary,
          codeQualityMetrics: {
            maintainability: 60 + (repoSeed % 21),
            reliability: 55 + (repoSeed % 26),
            security: 40 + (repoSeed % 31),
            coverage: 50 + (repoSeed % 26),
          },
        });
      }, 2000); // Simulate 2-second scan
    });
  }

  hashString(value) {
    let hash = 0;
    for (let i = 0; i < value.length; i += 1) {
      const char = value.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return Math.abs(hash);
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
