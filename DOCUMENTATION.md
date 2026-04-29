# Project Documentation: Glamour Glow - Lead Generation Platform

## 1. Project Abstract
**Glamour Glow** is a modern, high-performance web application designed for a premium skincare brand. Its primary goal is to capture high-quality leads through a beautiful, responsive landing page and provide a robust administrative interface for managing and exporting those leads. The platform bridges the gap between digital marketing and sales operations by automating the data collection process.

## 2. Requirements Specification
To ensure optimal performance and development, the following requirements were met:

### 2.1 Hardware Requirements
- **Processor:** Intel Core i3 or higher (or equivalent Apple Silicon)
- **RAM:** 8GB Minimum
- **Disk Space:** 500MB for source code and dependencies
- **Internet:** Required for Supabase cloud connectivity and deployment

### 2.2 Software Requirements
- **Operating System:** Windows 10+, macOS, or Linux
- **Node.js:** v18.0.0 or higher
- **Package Manager:** npm (Node Package Manager)
- **Database:** Supabase (Cloud-hosted PostgreSQL)
- **Code Editor:** Visual Studio Code (Recommended)
- **Browser:** Google Chrome or any modern Chromium-based browser

## 3. Technology Stack
The project is built using the **MERN** equivalent for modern serverless development:
- **Frontend Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (for type safety and maintainability)
- **Styling:** Tailwind CSS (utility-first CSS framework)
- **Icons:** Lucide React
- **Backend/Database:** Supabase (PostgreSQL with Realtime capabilities)
- **Authentication:** Supabase Auth (Email/Password)
- **Deployment:** Vercel

## 3. Core Features
### A. Landing Page (Customer Facing)
- **Dynamic Hero Section:** Engaging visual and CTA to capture attention immediately.
- **Service/About Sections:** Detailed information about the brand's botanical luxury philosophy.
- **Lead Capture Form:** Validated form (using Zod) to collect user details (Name, Email, Phone, Skin Type, Skin Concern).
- **Responsive Design:** Optimized for mobile, tablet, and desktop viewing.
- **Smooth Animations:** Integrated scroll-reveal animations for an interactive user experience.

### B. Admin Dashboard (Internal)
- **Secure Authentication:** Protected login page ensuring only authorized personnel can access lead data.
- **Real-time Lead Management:** View all submitted leads in a clean, tabular format.
- **Lead Status Tracking:** Ability to manage the progress of each lead (New, Contacted, Converted, etc.).
- **Data Export:** Export lead data to CSV format for CRM integration or offline analysis.
- **Search and Filter:** Quickly find specific leads based on user input.

## 4. Project Architecture
The project follows a standard Next.js App Router structure:
- `/app`: Contains all routes and server actions.
    - `/admin`: The protected administration dashboard.
    - `/login`: The admin authentication portal.
    - `/api`: Backend API endpoints for lead submission and notifications.
- `/components`: Modular UI components divided into:
    - `landing/`: Individual sections of the home page.
    - `ui/`: Global components like Navbar and Footer.
- `/lib`: Supabase client configurations and helper utilities.
- `/types`: TypeScript interfaces and Zod schemas for data validation.
- `/public`: Static assets (images, logos).

## 5. Setup and Installation
To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone <your-repo-link>
   cd glamour-leads
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file with your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 6. Database Schema (Supabase)
The project utilizes a `leads` table with the following structure:
- `id`: uuid (Primary Key)
- `name`: text
- `email`: text
- `phone`: text
- `skin_type`: text (nullable)
- `skin_concern`: text (nullable)
- `message`: text (nullable)
- `status`: text (default: 'new')
- `created_at`: timestamp with time zone

## 7. Project Outcome
The final system successfully delivers a premium user experience while maintaining a professional administrative backbone. 
- **Lead Accuracy:** Increased through strict Zod validation.
- **Accessibility:** 100% mobile-responsive design.
- **Development Efficiency:** Leveraged serverless architecture to reduce maintenance overhead.

## 8. Conclusion
This project demonstrates a full-stack implementation merging modern UI/UX design with robust backend security and data management features. It is scalable, type-safe, and ready for production use.
