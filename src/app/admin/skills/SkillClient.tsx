"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Skill } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, Plus, Edit, ImageIcon } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  initialData: Skill[];
}

export default function SkillClient({ initialData }: Props) {
  const router = useRouter();
  const [data, setData] = useState<Skill[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);
  
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    image: "",
  });

  const onOpenAdd = () => {
    setEditingId(null);
    setFormData({ name: "", category: "", image: "" });
    setIsOpen(true);
  };

  const onOpenEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setFormData({
      name: skill.name,
      category: skill.category,
      image: skill.image || "",
    });
    setIsOpen(true);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editingId ? `/api/skills/${editingId}` : "/api/skills";
      const method = editingId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const saved = await res.json();
        if (editingId) {
          setData((prev) => prev.map((s) => (s.id === editingId ? saved : s)));
          toast.success("Skill updated successfully");
        } else {
          setData((prev) => [saved, ...prev]);
          toast.success("Skill added successfully");
        }
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error("Failed to save skill");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      if (res.ok) {
        setData((prev) => prev.filter((s) => s.id !== id));
        toast.success("Skill deleted successfully");
        router.refresh();
      } else {
        toast.error("Failed to delete skill");
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
            <h2 className="text-xl font-bold font-heading">Manage Skills</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Total: {data.length} skills</p>
          </div>
          <Button onClick={onOpenAdd} className="rounded-xl">
            <Plus className="mr-2 h-4 w-4" /> Add Skill
          </Button>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-md bg-card border-border shadow-2xl">
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl">
                {editingId ? "Edit Skill" : "Add New Skill"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={onSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Skill Icon/Image</label>
                <ImageUpload 
                  value={formData.image} 
                  onChange={(url) => setFormData({...formData, image: url})} 
                  onRemove={() => setFormData({...formData, image: ""})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase">Skill Name</label>
                <Input placeholder="e.g. React" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase">Category</label>
                <Input placeholder="e.g. Frontend" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required />
              </div>
              <Button type="submit" disabled={loading} className="w-full h-11 rounded-xl font-bold">
                {loading ? "Saving..." : editingId ? "Update Skill" : "Create Skill"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">No.</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((skill, index) => (
              <TableRow key={skill.id} className="group">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  {skill.image ? (
                    <div className="relative w-8 h-8 rounded overflow-hidden">
                      <Image src={skill.image} alt={skill.name} fill className="object-contain" sizes="32px" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground"><ImageIcon size={16} /></div>
                  )}
                </TableCell>
                <TableCell className="font-bold">{skill.name}</TableCell>
                <TableCell>
                  <span className="text-xs font-bold px-3 py-1 bg-secondary rounded-full uppercase tracking-wider">
                    {skill.category}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => onOpenEdit(skill)}>
                      <Edit className="h-4 w-4 text-primary" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(skill.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-12">
                  No skills found. Click &quot;Add Skill&quot; to create one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
