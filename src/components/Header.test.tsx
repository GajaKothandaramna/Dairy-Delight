import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { Header } from "./header";


vi.mock("./BasketContext", () => ({
  useBasket: () => ({
    basket: [{ id: 1 }, { id: 2 }], // mock 2 items in basket
  }),
}));

describe("Header Component", () => {
  const renderHeader = () =>
      render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

  it("renders logo image", () => {
    renderHeader();
    const logo = screen.getByAltText(/dairy delights logo/i);
    expect(logo).toBeInTheDocument();
  });

   it("renders welcome title", () => {
    renderHeader();
    expect(
      screen.getByText(/welcome to dairy delights/i)
     ).toBeInTheDocument();
  });

  it("renders Home and My Basket buttons", () => {
    renderHeader();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/my basket/i)).toBeInTheDocument();
  });

  it("shows basket count", () => {
    renderHeader();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});