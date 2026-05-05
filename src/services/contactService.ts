import { randomUUID } from "crypto";
import { RawCardData, CRMContact, AppError } from "../types";
import { contactRepository } from "../repositories/contactRepository";

function parseFullName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" ") || "-",
  };
}

function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

export const contactService = {

  async createContact(raw: RawCardData): Promise<CRMContact> {
    const email = normalizeEmail(raw.email);

    // Duplicate kontrolü
    const existing = await contactRepository.findByEmail(email);
    if (existing) {
      throw new AppError(`Bu email zaten kayıtlı: ${email}`, 409);
    }

    const { firstName, lastName } = parseFullName(raw.fullName);
    const now = new Date().toISOString();

    const contact: CRMContact = {
      id: randomUUID(),
      firstName,
      lastName,
      email,
      phone: raw.phone?.trim() || "-",
      company: raw.company?.trim() || "-",
      jobTitle: raw.jobTitle?.trim() || "-",
      createdAt: now,
      updatedAt: now,
      source: "business_card",
    };

    return contactRepository.save(contact);
  },

  async getAllContacts(page = 1, limit = 10) {
    const [contacts, total] = await Promise.all([
      contactRepository.findAll(page, limit),
      contactRepository.count(),
    ]);
    return { contacts, total, page, limit };
  },

  async getContactById(id: string): Promise<CRMContact> {
    const contact = await contactRepository.findById(id);
    if (!contact) {
      throw new AppError(`Kişi bulunamadı: ${id}`, 404);
    }
    return contact;
  },

  async updateContact(id: string, data: Partial<RawCardData>): Promise<CRMContact> {
    const contact = await contactRepository.findById(id);
    if (!contact) {
      throw new AppError(`Kişi bulunamadı: ${id}`, 404);
    }

    const updated = await contactRepository.update(id, {
      phone: data.phone?.trim(),
      company: data.company?.trim(),
      jobTitle: data.jobTitle?.trim(),
    });

    return updated!;
  },

  async deleteContact(id: string): Promise<void> {
    const deleted = await contactRepository.delete(id);
    if (!deleted) {
      throw new AppError(`Kişi bulunamadı: ${id}`, 404);
    }
  },
};