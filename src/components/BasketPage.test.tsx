import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { BasketPage } from "./BasketPage";
import type { Dairy } from "../types/Dairy";


let mockBasket: Dairy[] = [];
const addToBasketMock = vi.fn();
const removeFromBasketMock = vi.fn();


vi.mock("./BasketContext", () => ({
  useBasket: () => ({
    basket: mockBasket,
    addToBasket: addToBasketMock,
    removeFromBasket: removeFromBasketMock,
  }),
}));

const milk: Dairy = {
    id: 1,
    name: "Organic Milk",
    price: 50,
    type: "Milk",
    quantity: 1,
    image: "",
    fatPercentage: 0
};

const cheese: Dairy = {
    id: 2,
    name: "Cheese",
    price: 100,
    type: "Cheese",
    quantity: 1,
    image: "",
    fatPercentage: 0
};

describe("BasketPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows empty basket message when basket is empty", () => {
    mockBasket = [];

    render(<BasketPage />);

    expect(
      screen.getByText(/your basket is empty/i)
    ).toBeInTheDocument();
  });

  it("renders basket items", () => {
    mockBasket = [milk, cheese];

    render(<BasketPage />);

    expect(screen.getByText("Organic Milk")).toBeInTheDocument();
    expect(screen.getAllByText("Cheese").length).toBeGreaterThan(0);
    expect(screen.getAllByText("₹50").length).toBeGreaterThan(0);
    expect(screen.getAllByText("₹100").length).toBeGreaterThan(0);
  });

   it("shows total price", () => {
    //mockBasket = [milk, cheese];
    mockBasket = [
      { ...milk, quantity: 2 }, // 100
      { ...cheese, quantity: 1 }, // 100
    ];

    render(<BasketPage />);

    expect(screen.getByText(/total: ₹200/i)).toBeInTheDocument();
  });

  it("shows insights (most picked & average)", () => {
    mockBasket = [
        { ...milk, quantity: 2 },
        { ...cheese, quantity: 1 },
    ];

    render(<BasketPage />);

    expect(screen.getByText(/most picked dairy type/i)).toBeInTheDocument();
    
    expect(screen.getByText(/average item price:/i)).toBeInTheDocument();
  });

   it("calls removeFromBasket when remove button is clicked", () => {
    mockBasket = [{ ...milk, quantity: 1 }];

    render(<BasketPage />);

    const removeButton = screen.getByLabelText(/remove-from-basket/i);
  fireEvent.click(removeButton);

  expect(removeFromBasketMock).toHaveBeenCalled();
  });
});