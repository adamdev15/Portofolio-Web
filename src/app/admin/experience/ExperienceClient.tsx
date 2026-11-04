"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Experience } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, Plus, Edit, Calendar, ImageIcon } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  initialData: Experience[];
}

export default function ExperienceClient({ initialData }: Props) {
  const router = useRouter();
  const [data, setData] = useState<Experience[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);
  
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
    image: "",
  });

  const onOpenAdd = () => {
    setEditingId(null);
    setFormData({ company: "", position: "", startDate: "", endDate: "", description: "", image: "" });
    setIsOpen(true);
  };

  const onOpenEdit = (exp: Experience) => {
    setEditingId(exp.id);
    setFormData({
      company: exp.company,
      position: exp.position,
      startDate: exp.startDate,
      endDate: exp.endDate || "",
      description: exp.description,
      image: exp.image || "",
    });
    setIsOpen(true);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editingId ? `/api/experience/${editingId}` : "/api/experience";
      const method = editingId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      
      if (res.ok) {
        const saved = await res.json();
        if (editingId) {
          setData((prev) => prev.map((exp) => (exp.id === editingId ? saved : exp)));
          toast.success("Experience updated successfully");
        } else {
          setData((prev) => [saved, ...prev]);
          toast.success("Experience added successfully");
        }
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error("Failed to save experience");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    try {
      const res = await fetch(`/api/experience/${id}`, { method: "DELETE" });
      if (res.ok) {
        setData((prev) => prev.filter((exp) => exp.id !== id));
        toast.success("Experience deleted successfully");
        router.refresh();
      } else {
        toast.error("Failed to delete experience");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card border-border overflow-hidden p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold font-heading">Manage Experience</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Total: {data.length} records</p>
          </div>
          <Button onClick={onOpenAdd} className="rounded-xl">
            <Plus className="mr-2 h-4 w-4" /> Add Experience
          </Button>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-xl bg-card border-border shadow-2xl">
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl">
                {editingId ? "Edit Experience" : "Add New Experience"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={onSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Company Logo / Image</label>
                <ImageUpload 
                  value={formData.image} 
                  onChange={(url) => setFormData({...formData, image: url})} 
                  onRemove={() => setFormData({...formData, image: ""})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Company</label>
                  <Input placeholder="Company Name" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Position</label>
                  <Input placeholder="e.g. Senior Developer" value={formData.position} onChange={(e) => setFormData({...formData, position: e.target.value})} required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Start Date</label>
                  <Input placeholder="Jan 2020" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">End Date</label>
                  <Input placeholder="Present / Dec 2023" value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase">Description</label>
                <Textarea 
                  placeholder="Responsibilities and achievements..." 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})} 
                  required 
                  className="min-h-[110px]"
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full h-11 rounded-xl font-bold">
                {loading ? "Saving..." : editingId ? "Update Experience" : "Create Experience"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <Table>
          <TableHeader>
             <TableRow>
              <TableHead className="w-[50px]">No.</TableHead>
              <TableHead>Logo</TableHead>
              <TableHead>Company & Position</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((exp, index) => (
              <TableRow key={exp.id} className="group">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  {exp.image ? (
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-border">
                      <Image src={exp.image} alt={exp.company} fill className="object-cover" sizes="40px" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
                      <ImageIcon size={16} />
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="font-bold">{exp.company}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{exp.position}</div>
                </TableCell>
                <TableCell className="text-sm">
                   <div className="flex items-center gap-1">
                     <Calendar size={12} className="text-primary" />
                     {exp.startDate} - {exp.endDate || "Present"}
                   </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => onOpenEdit(exp)}>
                      <Edit className="h-4 w-4 text-primary" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(exp.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-12">
                  No experience records found. Click &quot;Add Experience&quot; to create one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
