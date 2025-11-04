# Capacity Management Application

> **🚀 Quick Deploy**: To deploy this app to Databricks, run `python deploy_to_databricks.py`

A modern full-stack web application built with React, TypeScript, Material-UI, Framer Motion, and FastAPI, designed for seamless deployment to Databricks Apps.

## Features

- **Modern UI**: Built with React 18, TypeScript, and Material-UI (MUI)
- **Smooth Animations**: Powered by Framer Motion for elegant transitions
- **Responsive Design**: Adaptive navigation drawer that expands/collapses
- **FastAPI Backend**: High-performance Python backend with automatic API documentation
- **Production Ready**: Optimized build pipeline for Databricks deployment
- **One-Command Deploy**: Simple deployment script handles everything

## Project Structure

```
capacity_management/
├── frontend/                 # React application
│   ├── src/
│   │   ├── App.tsx          # Main React component
│   │   ├── main.tsx         # Application entry point
│   │   └── vite-env.d.ts    # TypeScript definitions
│   ├── index.html           # HTML template
│   ├── package.json         # Frontend dependencies
│   ├── tsconfig.json        # TypeScript configuration
│   └── vite.config.ts       # Vite build configuration
├── backend/                  # FastAPI application
│   ├── app.py               # Main FastAPI application
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # Environment configuration
├── build.py                  # Build script
├── deploy_to_databricks.py  # Deployment script
├── app.yaml                  # Databricks app configuration
└── README.md                 # This file
```

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- Databricks CLI (for deployment)

### Local Development

1. **Clone the repository**

```bash
cd capacity_management
```

2. **Start the backend**

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The backend will start on `http://localhost:8000`
- API docs: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/api/health`

3. **Start the frontend** (in a new terminal)

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`

### Building for Production

Run the build script to compile the entire application:

```bash
python build.py
```

This will:
1. Install frontend dependencies (if needed)
2. Build the React app to static files
3. Copy static files to the backend
4. Verify backend dependencies

## Deployment to Databricks

### Prerequisites

1. **Install Databricks CLI**

```bash
pip install databricks-cli
```

2. **Configure Databricks CLI**

```bash
databricks configure --token
```

You'll need:
- Databricks workspace URL (e.g., `https://your-workspace.cloud.databricks.com`)
- Personal access token (create one in User Settings → Access Tokens)

### Deploy the App

**Standard Deployment:**

```bash
python deploy_to_databricks.py
```

**Hard Redeploy** (delete and redeploy):

```bash
python deploy_to_databricks.py --hard-redeploy
```

**Custom App Name:**

```bash
python deploy_to_databricks.py --app-name my-custom-name
```

### What the Deployment Script Does

The `deploy_to_databricks.py` script automatically:

1. ✅ Checks Databricks CLI installation and configuration
2. 🔍 Auto-detects workspace URL and user email
3. 🔨 Builds the React frontend (`npm run build`)
4. 📁 Copies static files to backend
5. 📦 Packages backend (excludes venv, tests, cache files)
6. 📤 Imports to Databricks workspace
7. 🚀 Deploys the app
8. 🌐 Shows the app URL

### Deployment Options

- **Normal Deploy**: Updates existing app or creates new one
- **Hard Redeploy**: Deletes existing app, waits for deletion, then deploys fresh
- **Custom Name**: Use `--app-name` to specify a different app name
- **Custom Folder**: Use `--app-folder` to specify workspace folder path

## API Documentation

Once deployed, your app provides automatic API documentation:

- **Interactive API Docs**: `https://your-app-url/docs`
- **Alternative Docs**: `https://your-app-url/redoc`

### Available Endpoints

#### `GET /api/health`
Health check endpoint that returns application status.

**Response:**
```json
{
  "status": "healthy",
  "environment": "production",
  "debug": "False"
}
```

#### `GET /api/data`
Sample data endpoint.

**Response:**
```json
{
  "message": "Sample data from FastAPI backend",
  "items": [
    {"id": 1, "name": "Item 1", "value": 100},
    {"id": 2, "name": "Item 2", "value": 200},
    {"id": 3, "name": "Item 3", "value": 300}
  ]
}
```

## Frontend Features

### Navigation Drawer

- **Expandable/Collapsible**: Click the menu icon to toggle
- **Three States**:
  - Fully expanded with text labels
  - Minimized to icon-only mode
  - Completely hidden
- **Smooth Transitions**: Powered by Framer Motion

### Navigation Items

- Dashboard
- Analytics
- Reports
- Settings

### API Access

Click the API icon in the top-right corner to open API documentation in a new tab.

## Technology Stack

### Frontend
- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe JavaScript
- **Material-UI (MUI)**: Component library
- **Framer Motion**: Animation library
- **Vite**: Fast build tool
- **React Router**: Client-side routing

### Backend
- **FastAPI**: Modern Python web framework
- **Uvicorn**: ASGI server
- **Python 3.9+**: Runtime environment

### Build & Deploy
- **Python Scripts**: Automated build and deployment
- **Databricks CLI**: Workspace and app management
- **Databricks Apps**: Hosting platform

## Configuration

### Frontend Configuration

Edit `frontend/vite.config.ts` to customize:
- Build output directory
- Development server port
- API proxy settings

### Backend Configuration

Edit `backend/.env` for local development:
```env
ENV=development
DEBUG=True
PORT=8000
```

Production configuration is automatically set during deployment via `app.yaml`.

### Databricks Configuration

Edit `app.yaml` to customize:
- Command to run the server
- Environment variables
- Resource allocation (CPU, memory)

## Troubleshooting

### Frontend Build Issues

**Problem**: `npm run build` fails

**Solutions**:
- Ensure Node.js 18+ is installed: `node --version`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear npm cache: `npm cache clean --force`

### Backend Issues

**Problem**: Backend won't start

**Solutions**:
- Check Python version: `python --version` (should be 3.9+)
- Install dependencies: `pip install -r backend/requirements.txt`
- Check port 8000 is not in use: `lsof -i :8000`

### Deployment Issues

**Problem**: Databricks CLI not configured

**Solution**:
```bash
databricks configure --token
```

**Problem**: App fails to deploy

**Solutions**:
- Check CLI is logged in: `databricks workspace list /`
- Try hard redeploy: `python deploy_to_databricks.py --hard-redeploy`
- Check Databricks workspace has space for new apps

**Problem**: Static files not found after deployment

**Solutions**:
- Run `python build.py` to ensure static files are built
- Check `backend/static` directory exists and has content
- Verify `app.py` is correctly configured to serve static files

### Common Errors

**Error**: `Module not found: 'framer-motion'`

**Solution**: Install frontend dependencies
```bash
cd frontend && npm install
```

**Error**: `No module named 'fastapi'`

**Solution**: Install backend dependencies
```bash
cd backend && pip install -r requirements.txt
```

**Error**: `databricks: command not found`

**Solution**: Install Databricks CLI
```bash
pip install databricks-cli
```

## Development Tips

### Hot Reload

Both frontend and backend support hot reload during development:
- **Frontend**: Changes to React files automatically reload in browser
- **Backend**: Run with `python app.py` for automatic reload on code changes

### Adding New API Endpoints

1. Add endpoint to `backend/app.py`:
```python
@app.get("/api/my-endpoint")
async def my_endpoint():
    return {"message": "Hello from new endpoint"}
```

2. FastAPI automatically adds it to API docs at `/docs`

### Adding New Frontend Components

1. Create component in `frontend/src/components/`
2. Import and use in `App.tsx`
3. TypeScript will provide type checking

### Debugging

**Frontend**:
- Use browser DevTools (F12)
- React DevTools extension recommended

**Backend**:
- Set `DEBUG=True` in `.env`
- Check logs at `http://localhost:8000/docs` for endpoint testing

## Contributing

1. Make changes locally
2. Test with `python build.py`
3. Test deployment to Databricks
4. Submit changes

## License

This project is provided as-is for use with Databricks Apps.

## Support

For issues with:
- **Databricks Apps**: Contact Databricks support
- **This Application**: Check troubleshooting section above
- **Claude Code**: Visit https://docs.claude.com/claude-code

## Next Steps

After deployment, consider:
1. Customizing the UI theme in `frontend/src/App.tsx`
2. Adding authentication to API endpoints
3. Connecting to Databricks data sources
4. Adding more navigation items and routes
5. Implementing state management (Redux, Zustand, etc.)
6. Adding tests for frontend and backend

---

Built with Claude Code | Deployed on Databricks Apps
