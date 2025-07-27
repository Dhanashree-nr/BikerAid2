import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBikerSchema, insertTestimonialSchema } from "@shared/schema";
import { randomUUID } from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {
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

  // Get biker profile by ID
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

  const httpServer = createServer(app);
  return httpServer;
}
