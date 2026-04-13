import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";

import { DairyList } from "./DairyList";
import type { Dairy } from "../types/Dairy";

vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;


vi.mock("./SearchDiary", () => ({
  SearchDairy: () => <div>Search Component</div>,
}));

vi.mock("./DairyCard", () => ({
  DairyCard: ({ dairy1 }: { dairy1: Dairy }) => (
    <li>{dairy1.name}</li>
  ),
}));

vi.mock("./ErrorMessage", () => ({
  ErrorMessage: ({ msg }: { msg: string }) => <p>{msg}</p>,
}));

const mockDairyData: Dairy[] = [
  {
      id: "1", name: "Milk", price: 50, type: "Milk",
      image: "",
      fatPercentage: 0
  },
  {
      id: "2", name: "Cheese", price: 100, type: "Cheese",
      image: "",
      fatPercentage: 0
  },
];

const mockOnEditDairy = vi.fn();
const mockOnDeleteDairy = vi.fn();


describe("DairyList Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

   it("shows loading message initially", () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    // render(<DairyList 
    //         onEditDairy={mockOnEditDairy}
    //         onDeleteDairy={mockOnDeleteDairy}/>);
    render(<DairyList  dairys={[]}  onEditDairy={mockOnEditDairy}
            onDeleteDairy={mockOnDeleteDairy}/>);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

   it("renders dairy products after successful API call", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockDairyData });

    // render(<DairyList onEditDairy={mockOnEditDairy}
    //                   onDeleteDairy={mockOnDeleteDairy}/>);
    render(<DairyList  dairys={[]}  onEditDairy={mockOnEditDairy}
            onDeleteDairy={mockOnDeleteDairy}/>);

    await waitFor(() => {
      expect(screen.getByText("Milk")).toBeInTheDocument();
      expect(screen.getByText("Cheese")).toBeInTheDocument();
    });
  });

  it("shows message when no dairy products are returned", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    // render(<DairyList onEditDairy={mockOnEditDairy}
    //                   onDeleteDairy={mockOnDeleteDairy}/>);
    render(<DairyList  dairys={[]}  onEditDairy={mockOnEditDairy}
            onDeleteDairy={mockOnDeleteDairy}/>);

    await waitFor(() => {
      expect(
        screen.getByText(/no dairy products available/i)
      ).toBeInTheDocument();
    });
  });

  it("shows error message when API fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("API Error"));

    // render(<DairyList onEditDairy={mockOnEditDairy}
    //                   onDeleteDairy={mockOnDeleteDairy}/>);

    render(<DairyList  dairys={[]}  onEditDairy={mockOnEditDairy}
            onDeleteDairy={mockOnDeleteDairy}/>);

    await waitFor(() => {
      expect(
        screen.getByText(/error has occured/i)
      ).toBeInTheDocument();
    });
  });
});