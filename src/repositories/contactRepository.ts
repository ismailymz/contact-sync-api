import { CRMContact } from "../types";

// Gerçek projede burası PostgreSQL/MongoDB olur
// Görüşmede bunu açıkla — mimari aynı, sadece storage değişir
class ContactRepository {
  private contacts: Map<string, CRMContact> = new Map();

  async findAll(page: number, limit: number): Promise<CRMContact[]> {
    const all = Array.from(this.contacts.values());
    const start = (page - 1) * limit;
    return all.slice(start, start + limit);
  }

  async findById(id: string): Promise<CRMContact | null> {
    return this.contacts.get(id) || null;
  }

  async findByEmail(email: string): Promise<CRMContact | null> {
    for (const contact of this.contacts.values()) {
      if (contact.email === email) return contact;
    }
    return null;
  }

  async save(contact: CRMContact): Promise<CRMContact> {
    this.contacts.set(contact.id, contact);
    return contact;
  }

  async update(id: string, data: Partial<CRMContact>): Promise<CRMContact | null> {
    const existing = this.contacts.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...data, updatedAt: new Date().toISOString() };
    this.contacts.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.contacts.delete(id);
  }

  async count(): Promise<number> {
    return this.contacts.size;
  }
}

// Singleton — tüm uygulama aynı instance'ı kullanır
export const contactRepository = new ContactRepository();