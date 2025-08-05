// import { Express } from "express";
import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { signupvalidation } from "../middlewares/validation";

const router = Router();

// router.get("/migration", authController.migration);
router.post("/permission", authController.Permission);

/**
 * @swagger
 * paths:
 *   /signup:
 *     post:
 *       summary: Register a new user with OTP and role-based logic
 *       tags:
 *         - Registration
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 role:
 *                   oneOf:
 *                     - type: string
 *                     - type: array
 *                       items:
 *                         type: string
 *                 customertype:
 *                   type: string
 *               required:
 *                 - name
 *                 - email
 *                 - password
 *                 - phone
 *                 - role
 *       responses:
 *         '201':
 *           description: User registered successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   token:
 *                     type: string
 *         '400':
 *           description: Validation error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                   errorKey:
 *                     type: string
 *                   error:
 *                     type: string
 */

router.post("/signup", signupvalidation.signupschema, authController.create);
/**
 * @swagger
 * /verifyotp:
 *   post:
 *     summary: Verify OTP and create a user account
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *               - token
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               otp:
 *                 type: integer
 *                 example: 123456
 *               token:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: OTP verified and user created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   nullable: true
 *                 msg:
 *                   type: string
 *                   example: Your OTP has been verified
 *       400:
 *         description: Invalid or expired OTP
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errorKey:
 *                   type: string
 *                   example: OTP_INVALID
 *                 error:
 *                   type: string
 *                   example: The OTP is invalid
 *       401:
 *         description: Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errorKey:
 *                   type: string
 *                   example: TOKEN_MISSING
 *                 error:
 *                   type: string
 *                   example: Authorization token is required
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errorKey:
 *                   type: string
 *                   example: USER_NOT_FOUND
 *                 error:
 *                   type: string
 *                   example: User does not exist
 *       500:
 *         description: Internal server error
 */

router.post("/verifyotp", signupvalidation.OTP, authController.verify);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user and return JWT token
 *     tags:
 *       - Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: strongPassword123
 *               role:
 *                 oneOf:
 *                   - type: array
 *                     items:
 *                       type: string
 *                     example: ["admin", "supplier"]
 *                   - type: string
 *                     example: admin
 *     responses:
 *       201:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 msg:
 *                   type: string
 *                   example: Login Successfully
 *       400:
 *         description: Role mismatch or OTP error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errorKey:
 *                   type: string
 *                   example: ROLE_MISMATCHING
 *                 error:
 *                   type: string
 *                   example: Your Entered role is not mismatching
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errorKey:
 *                   type: string
 *                   example: USER_NOT_FOUND
 *                 error:
 *                   type: string
 *                   example: User is Not found in please Register Your Self
 *       500:
 *         description: Internal server error
 */

router.post("/login", signupvalidation.login, authController.login);
/**
 * @swagger
 * /update/{id}:
 *   put:
 *     summary: Update user information
 *     tags:
 *       - Update User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: newStrongPassword123
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               customertype:
 *                 type: string
 *                 example: retailer
 *               address:
 *                 type: string
 *                 example: 123 Market Street, NY
 *             additionalProperties: false
 *             example:
 *               name: Jane Doe
 *               email: jane@example.com
 *               password: newPassword123
 *               phone: "1234567890"
 *               customertype: customer
 *               address: 456 Main Road, TX
 *     responses:
 *       200:
 *         description: User updated successfully or not
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Updated user record(s)
 *                 msg:
 *                   type: string
 *                   example: User Info updated successfully
 *       400:
 *         description: Bad request - Invalid ID or restricted field change
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errorKey:
 *                   type: string
 *                   example: FIELD_CANT_CHANGE
 *                 error:
 *                   type: string
 *                   example: Please don't enter the role and id that are not changeable
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errorKey:
 *                   type: string
 *                   example: USER_NOT_FOUND
 *                 error:
 *                   type: string
 *                   example: User does not exist
 *       500:
 *         description: Internal server error
 */

router.put("/update/:id", authController.update);
/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags:
 *       - Deletion Of User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: integer
 *           example: 7
 *     responses:
 *       200:
 *         description: Deletion status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: integer
 *                   nullable: true
 *                   example: 1
 *                 msg:
 *                   type: string
 *                   example: The data is successfully deleted
 *       400:
 *         description: Bad Request – ID is not a number
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errorKey:
 *                   type: string
 *                   example: ID_NAN
 *                 error:
 *                   type: string
 *                   example: Please Enter ID IN Number
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errorKey:
 *                   type: string
 *                   example: USER_NOT_FOUND
 *                 error:
 *                   type: string
 *                   example: User does not exist
 *       500:
 *         description: Internal server error
 */

router.delete("/delete/:id", authController.delete);

export default router;

// 210775
