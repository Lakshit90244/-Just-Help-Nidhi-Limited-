# 🚀 Deployment Commands - Copy & Paste करें

## Step 1: GitHub Repository बनाने के बाद

### Command Prompt में ये commands run करें:

```bash
# GitHub repository से connect करें (अपना username डालें)
git remote add origin https://github.com/YOUR_USERNAME/savara-nidhi-website.git

# Main branch set करें
git branch -M main

# Code को GitHub पर push करें
git push -u origin main
```

**Important**: `YOUR_USERNAME` को अपना actual GitHub username से replace करें

## Step 2: Vercel पर Deploy करें

### 2.1 Vercel Account:
1. **vercel.com** पर जाएं
2. **"Sign up with GitHub"** पर click करें
3. GitHub account से login करें

### 2.2 Import Project:
1. **"New Project"** पर click करें
2. **"Import Git Repository"** select करें
3. `savara-nidhi-website` repository select करें
4. **"Import"** पर click करें

### 2.3 Environment Variables:
**Environment Variables section में ये add करें:**

```env
MONGODB_URI=mongodb+srv://pallavjoshi:EHjf5Hliz61jvVXb@cluster0.lwadmzq.mongodb.net/finance-website?retryWrites=true&w=majority

NEXTAUTH_SECRET=savara-nidhi-secret-key-2025-random-string

NEXTAUTH_URL=https://your-project-name.vercel.app
```

**Note**: `NEXTAUTH_URL` को deployment के बाد actual URL से update करें

### 2.4 Deploy:
1. **"Deploy"** button पर click करें
2. **Wait** 2-3 minutes
3. **Success!** Website live हो जाएगी

## Step 3: After Deployment

### ✅ Your Live URLs:
- **Website**: `https://savara-nidhi-website.vercel.app`
- **Admin Panel**: `https://savara-nidhi-website.vercel.app/admin`

### ✅ Login Credentials:
- **Email**: pallavjoshi@gmail.com
- **Password**: pallav123

### ✅ Features Working:
- सावरा branding
- MongoDB connection
- Admin panel CRUD
- Authentication
- Mobile responsive
- SSL certificate

## Troubleshooting:

### If Build Fails:
1. Check Vercel build logs
2. Ensure all environment variables are set
3. Check MongoDB connection

### If MongoDB Issues:
1. Ensure IP `0.0.0.0/0` is whitelisted in MongoDB Atlas
2. Check connection string is correct
3. Test locally first

## Success! 🎉

आपकी website अब **24/7 live** है और laptop बंद करने के बाद भी चलती रहेगी!