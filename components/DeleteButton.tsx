"use client";
import { deletePitch } from "@/lib/actions";
import React from "react";
import { Button } from "./ui/button";

interface DeleteButtonProps {
  id: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
  return (
    <Button className="startup-card_delbtn" onClick={() => deletePitch(id)}>
      Delete
    </Button>
  );
};

export default DeleteButton;
