import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import LeadForm from "@/components/b2b/LeadForm";

describe("LeadForm", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  function fillAndSubmit() {
    fireEvent.change(screen.getByLabelText(/seu nome/i), {
      target: { value: "Dra. Ana" },
    });
    fireEvent.change(screen.getByLabelText(/nome da clínica/i), {
      target: { value: "Clínica Bella" },
    });
    fireEvent.change(screen.getByLabelText(/whatsapp/i), {
      target: { value: "(62) 99999-0000" },
    });
    fireEvent.click(screen.getByRole("button", { name: /quero meu site/i }));
  }

  it("posts the lead to /api/lead and shows confirmation", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({ ok: true });

    render(<LeadForm />);
    fillAndSubmit();

    await waitFor(() =>
      expect(screen.getByText(/recebido, dra\. ana/i)).toBeInTheDocument()
    );

    expect(fetch).toHaveBeenCalledWith(
      "/api/lead",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          name: "Dra. Ana",
          clinic: "Clínica Bella",
          whatsapp: "(62) 99999-0000",
        }),
      })
    );
  });

  it("shows an error message when the API fails and keeps the form", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({ ok: false, status: 502 });

    render(<LeadForm />);
    fillAndSubmit();

    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
    // Form still visible so the user can retry
    expect(screen.getByRole("button", { name: /quero meu site/i })).toBeInTheDocument();
  });
});
