const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { createTaskValidationRules, paginationValidationRules } = require('../validators/taskValidators');
const validate = require('../middlewares/validationHandler');
const authenticateToken = require('../middlewares/authMiddleware');
const ensureAdmin = require('../middlewares/adminMiddleware');

// POST /tasks - Új feladat létrehozása
router.post('/', createTaskValidationRules(), validate, taskController.createTask);

// GET /tasks - Összes feladat lekérdezése (admin only)
router.get('/', authenticateToken, ensureAdmin, taskController.getAllTasks);

// GET /tasks/page/:page - Feladatok lekérdezése lapozással (max 10) (admin only)
router.get('/page/:page', authenticateToken, ensureAdmin, paginationValidationRules(), validate, taskController.getTasksPaginated);

// DELETE /tasks/:id - Feladat törlése ID alapján
router.delete('/:id', taskController.deleteTask);

module.exports = router;
