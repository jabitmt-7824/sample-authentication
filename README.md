# Sample Authentication System

### Features
- Sign up with email
- Sign in (redirect to a blank home page with a sign out and reset password)
- Sign out
- Reset password after sign in (send a reset password link mail to email)
- Google login/signup
- Forgot password (send a reset password link mail to email)

### Database Model
- User (name,email,password);

### Folder Structure
- assets (static files)
   - css
     - forget_password.css (style for forget password form page)
     - header.css (style for page header)
     - login.css (style for login page)
     - reset_pass.css (style for reset password form page)
     - signup.css (style for signup page)
- config (configuration files)
   - middleware.js (for setting flash)
   - moongose.js (for database connection)
   - nodemailer.js (for configuring nodemailer(transporter, rendertemplates))
   - passport-google-oauth2-strategy.js (for passport-google-oauth2 configuration)
   - passport-local-strategy.js (for passport-local configuration)
- controllers
   - userController.js (contain all controllers)
- mailers (for seetting mailer)
   - reset_mail.js (for setting reset password mail)
- models
   - user.js (for creating user databse model)
- routes
   - index.js (contain all routes)
- views
   - mailers
      - user
         - reset_password.ejs (view for reset password mail)
   - forget_password.ejs (view for forgot password page)
   - header.ejs (view for page header)
   - home.ejs (view for user home page after signin)
   - layout.ejs (common view/layout for all pages)
   - login.ejs (view for login page(start page or first page))
   - reset_notification.ejs (view for a page with information about resetting password link mail send to your email)
   - reset_pass.ejs (view for reset password form page)
   - signup.ejs (view for signup page)
- index.js
- package.json
- package-lock.json

### how to start
    npm start

### when running in local system
    - in cofig/nodemailer , auth part of transporter give your email as user and thier password as pass
