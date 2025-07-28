import { type User, type InsertUser, type Biker, type InsertBiker, type Testimonial, type InsertTestimonial, users, bikers, testimonials } from "@shared/schema";
import { db } from "./db";
import { eq, count } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getBiker(id: string): Promise<Biker | undefined>;
  getBikerByQRId(qrId: string): Promise<Biker | undefined>;
  getBikerByEmail(email: string): Promise<Biker | undefined>;
  createBiker(biker: InsertBiker & { qrCode: string }): Promise<Biker>;
  updateBiker(id: string, updates: Partial<InsertBiker>): Promise<Biker | undefined>;
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getStats(): Promise<{
    registeredBikers: number;
    emergencyScans: number;
    livesSaved: number;
    avgResponseTime: string;
  }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getBiker(id: string): Promise<Biker | undefined> {
    const [biker] = await db.select().from(bikers).where(eq(bikers.id, id));
    return biker || undefined;
  }

  async getBikerByQRId(qrId: string): Promise<Biker | undefined> {
    // Find biker by QR code path that includes the ID
    const allBikers = await db.select().from(bikers);
    return allBikers.find(biker => biker.qrCode.includes(qrId)) || undefined;
  }

  async getBikerByEmail(email: string): Promise<Biker | undefined> {
    const [biker] = await db.select().from(bikers).where(eq(bikers.email, email));
    return biker || undefined;
  }

  async updateBiker(id: string, updates: Partial<InsertBiker>): Promise<Biker | undefined> {
    const [updatedBiker] = await db
      .update(bikers)
      .set(updates)
      .where(eq(bikers.id, id))
      .returning();
    return updatedBiker || undefined;
  }

  async createBiker(bikerData: InsertBiker & { qrCode: string }): Promise<Biker> {
    const [biker] = await db
      .insert(bikers)
      .values(bikerData)
      .returning();
    return biker;
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return await db
      .select()
      .from(testimonials)
      .orderBy(testimonials.createdAt);
  }

  async createTestimonial(testimonialData: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db
      .insert(testimonials)
      .values(testimonialData)
      .returning();
    return testimonial;
  }

  async getStats(): Promise<{
    registeredBikers: number;
    emergencyScans: number;
    livesSaved: number;
    avgResponseTime: string;
  }> {
    const [{ count: registeredBikers }] = await db
      .select({ count: count() })
      .from(bikers);
    
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

export const storage = new DatabaseStorage();
