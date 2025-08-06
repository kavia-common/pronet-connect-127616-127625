import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import { AuthProvider } from "../contexts/AuthContext";
import { MemoryRouter } from "react-router-dom";

// Mock axios globally
jest.mock("axios");

describe("App authentication and navigation", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("shows login and register links if user is not authenticated", () => {
    render(
      <AuthProvider>
        <MemoryRouter><App /></MemoryRouter>
      </AuthProvider>
    );
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByText(/register/i)).toBeInTheDocument();
  });

  it("redirects unauthenticated users to login for protected route", () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/profile"]}><App /></MemoryRouter>
      </AuthProvider>
    );
    // waits for the redirect to login page due to no user
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  // Add more tests with mock API for register/login, navigation, etc.
  // Example with mock
  it("login flow displays dashboard when login is successful", async () => {
    // Mock login
    const fakeUser = { name: "Eve", email: "eve@mock.com" };
    const fakeToken = "jwtmocktoken";
    require("axios").post.mockImplementation((url) => {
      if (url.includes("/auth/login")) return Promise.resolve({ data: { access_token: fakeToken } });
      return Promise.resolve({});
    });
    require("axios").get.mockImplementation((url) => {
      if (url.endsWith("/me")) return Promise.resolve({ data: fakeUser });
      return Promise.resolve({});
    });

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/login"]}>
          <App />
        </MemoryRouter>
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "eve@mock.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "pass1234" } });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/welcome, eve/i)).toBeInTheDocument();
    });
  });
});
