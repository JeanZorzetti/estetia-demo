import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "@/components/BookingForm";

describe("BookingForm", () => {
  it("shows confirmation after submit with all required fields", () => {
    render(<BookingForm />);

    fireEvent.change(screen.getByLabelText(/nome/i), {
      target: { value: "Maria Silva" },
    });
    fireEvent.change(screen.getByLabelText(/telefone/i), {
      target: { value: "(11) 91234-5678" },
    });
    fireEvent.change(screen.getByLabelText(/serviço/i), {
      target: { value: "Limpeza de Pele" },
    });

    fireEvent.click(screen.getByRole("button", { name: /agende/i }));

    expect(screen.getByText(/agendamento recebido/i)).toBeInTheDocument();
    expect(screen.getByText(/maria silva/i)).toBeInTheDocument();
  });

  it("resets form when 'Novo agendamento' is clicked", () => {
    render(<BookingForm />);

    fireEvent.change(screen.getByLabelText(/nome/i), {
      target: { value: "João" },
    });
    fireEvent.change(screen.getByLabelText(/telefone/i), {
      target: { value: "(21) 99999-9999" },
    });
    fireEvent.change(screen.getByLabelText(/serviço/i), {
      target: { value: "Botox" },
    });
    fireEvent.click(screen.getByRole("button", { name: /agende/i }));

    fireEvent.click(screen.getByRole("button", { name: /novo agendamento/i }));

    expect(screen.getByLabelText(/nome/i)).toHaveValue("");
  });
});
