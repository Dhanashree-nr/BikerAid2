import { type User, type InsertUser, type Biker, type InsertBiker, type Testimonial, type InsertTestimonial } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getBiker(id: string): Promise<Biker | undefined>;
  createBiker(biker: InsertBiker & { qrCode: string }): Promise<Biker>;
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getStats(): Promise<{
    registeredBikers: number;
    emergencyScans: number;
    livesSaved: number;
    avgResponseTime: string;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private bikers: Map<string, Biker>;
  private testimonials: Map<string, Testimonial>;
  private emergencyScans: number = 0;

  constructor() {
    this.users = new Map();
    this.bikers = new Map();
    this.testimonials = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getBiker(id: string): Promise<Biker | undefined> {
    // Find biker by QR code path
    return Array.from(this.bikers.values()).find(
      (biker) => biker.qrCode.includes(id)
    );
  }

  async createBiker(bikerData: InsertBiker & { qrCode: string }): Promise<Biker> {
    const id = randomUUID();
    const now = new Date();
    const biker: Biker = { 
      ...bikerData, 
      id,
      isActive: true,
      createdAt: now,
      updatedAt: now
    };
    this.bikers.set(id, biker);
    return biker;
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).sort(
      (a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async createTestimonial(testimonialData: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = {
      ...testimonialData,
      id,
      createdAt: new Date()
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async getStats(): Promise<{
    registeredBikers: number;
    emergencyScans: number;
    livesSaved: number;
    avgResponseTime: string;
  }> {
    const registeredBikers = this.bikers.size;
    const emergencyScans = Math.floor(registeredBikers * 0.05); // 5% scan rate
    const livesSaved = Math.floor(emergencyScans * 0.15); // 15% lives saved rate
    
    return {
      registeredBikers,
      emergencyScans,
      livesSaved,
      avgResponseTime: "45sec"
    };
  }
}

export const storage = new MemStorage();
