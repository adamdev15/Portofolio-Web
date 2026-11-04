"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ContactMessage } from "@prisma/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, Mail, User, Clock } from "lucide-react";
import { format } from "date-fns";

interface Props {
  initialData: ContactMessage[];
}

export default function ContactClient({ initialData }: Props) {
  const router = useRouter();
  const [data, setData] = useState<ContactMessage[]>(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const onDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/contacts/${id}`, { method: "DELETE" });
      if (res.ok) {
        setData((prev) => prev.filter((m) => m.id !== id));
        toast.success("Message deleted successfully");
        router.refresh();
      } else {
        toast.error("Failed to delete message");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <Card className="glass-card border-border overflow-hidden p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold font-heading">Visitor Messages</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Total: {data.length} messages</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No.</TableHead>
            <TableHead>Sender</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((msg, index) => (
            <TableRow key={msg.id} className="group">
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-bold flex items-center gap-1.5"><User size={13} className="text-primary" /> {msg.name}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5"><Mail size={12} /> {msg.email}</span>
                </div>
              </TableCell>
              <TableCell className="font-medium">{msg.subject}</TableCell>
              <TableCell className="max-w-xs truncate text-muted-foreground" title={msg.message}>
                {msg.message}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                  <Clock size={12} /> {format(new Date(msg.createdAt), "dd MMM yyyy, HH:mm")}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => onDelete(msg.id)} className="text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                No messages found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
