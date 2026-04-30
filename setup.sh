#!/bin/bash

echo "🚀 Setting up Secko Auditor..."

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Backend Setup
echo -e "${BLUE}Setting up Backend...${NC}"
cd backend

if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file from .env.example${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ .env created. Please update ARMORIQ_API_KEY${NC}"
fi

if [ ! -d node_modules ]; then
    echo -e "${YELLOW}Installing backend dependencies...${NC}"
    npm install
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
fi

cd ..

# Frontend Setup
echo -e "${BLUE}Setting up Frontend...${NC}"
cd frontend

if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file from .env.example${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ .env created${NC}"
fi

if [ ! -d node_modules ]; then
    echo -e "${YELLOW}Installing frontend dependencies...${NC}"
    npm install
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
fi

cd ..

echo -e "${GREEN}✓ Setup complete!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Update backend/.env with your Armoriq API key"
echo "2. Ensure MongoDB is running (local or cloud)"
echo "3. Run 'npm run dev' in backend directory"
echo "4. Run 'npm start' in frontend directory"
echo ""
echo -e "${BLUE}Happy auditing! 🛡️${NC}"
