import { Request, Response, NextFunction } from "express";
import { contactService } from "../services/contactService";

export const contactController = {

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const contact = await contactService.createContact(req.body);
      res.status(201).json({ success: true, data: contact });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await contactService.getAllContacts(page, limit);
      res.json({
        success: true,
        data: result.contacts,
        total: result.total,
        page: result.page,
        limit: result.limit,
      });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const contact = await contactService.getContactById(req.params.id);
      res.json({ success: true, data: contact });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const contact = await contactService.updateContact(req.params.id, req.body);
      res.json({ success: true, data: contact });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await contactService.deleteContact(req.params.id);
      res.json({ success: true, message: "Kişi silindi" });
    } catch (err) {
      next(err);
    }
  },
};