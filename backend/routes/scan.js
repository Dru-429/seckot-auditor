const express = require('express');
const scanController = require('../controllers/scanController');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

router.post('/', scanController.createScan);
router.get('/', scanController.getUserScans);
router.get('/:scanId', scanController.getScanById);
router.get('/:scanId/status', scanController.getScanStatus);
router.delete('/:scanId', scanController.deleteScan);

module.exports = router;
