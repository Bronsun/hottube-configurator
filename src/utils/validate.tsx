export const validatePassword = (value: string): string => {
  const errors: string[] = [];
  if (value.length < 8) {
    errors.push("at least 8 characters");
  }
  if (!/[A-Z]/.test(value)) {
    errors.push("an uppercase letter");
  }
  if (!/[0-9]/.test(value)) {
    errors.push("a number");
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
    errors.push("a special character");
  }
  return errors.length > 0
    ? "Password must contain " + errors.join(", ") + "."
    : "";
};

export const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
