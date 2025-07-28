import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBikerSchema, insertTestimonialSchema, insertUserSchema } from "@shared/schema";
import { randomUUID } from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {
  // User signup endpoint
  app.post("/api/signup", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if email already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
      
      const user = await storage.createUser(userData);
      res.json({ id: user.id, email: user.email });
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Invalid data" });
    }
  });

  // Biker registration endpoint
  app.post("/api/bikers", async (req, res) => {
    try {
      const bikerData = insertBikerSchema.parse(req.body);
      const qrCode = `${process.env.REPLIT_DOMAINS?.split(',')[0] || 'localhost:5000'}/profile/${randomUUID()}`;
      const biker = await storage.createBiker({ ...bikerData, qrCode });
      res.json(biker);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Invalid data" });
    }
  });

  // Get biker profile by ID (for dashboard)
  app.get("/api/bikers/:id", async (req, res) => {
    try {
      const biker = await storage.getBiker(req.params.id);
      if (!biker) {
        return res.status(404).json({ message: "Biker not found" });
      }
      res.json(biker);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get biker profile by QR ID (for emergency profile viewing)
  app.get("/api/profile/:qrId", async (req, res) => {
    try {
      const biker = await storage.getBikerByQRId(req.params.qrId);
      if (!biker) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.json(biker);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Add new testimonial
  app.post("/api/testimonials", async (req, res) => {
    try {
      const testimonialData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(testimonialData);
      res.json(testimonial);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Invalid data" });
    }
  });

  // Get statistics
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // User login endpoint with proper password verification
  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
      
      // Find user by email
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      // Check password
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      // Find associated biker profile
      const biker = await storage.getBikerByEmail(user.email);
      if (!biker) {
        return res.status(404).json({ message: "Please register your emergency information first." });
      }
      
      res.json(biker);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update biker information
  app.put("/api/bikers/:id", async (req, res) => {
    try {
      const updates = insertBikerSchema.partial().parse(req.body);
      const updatedBiker = await storage.updateBiker(req.params.id, updates);
      
      if (!updatedBiker) {
        return res.status(404).json({ message: "Biker not found" });
      }
      
      res.json(updatedBiker);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Invalid data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
