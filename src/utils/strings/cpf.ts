import { ChangeEvent } from "react";
import { removeNonNumericCharacters } from "./remove-non-numeric-characters";

export const toCpf = (value: string) => {
  value = value.replace(/\D/g, "");

  if (value.length !== 11) {
    return value;
  }

  return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const toCpfCallback =
  (callback: (e: string) => void) =>
  (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    return callback(toCpf(event.target.value));
  };

export const validateCpf = (cpf: string): boolean => {
  const cpfDigitsOnly = removeNonNumericCharacters(cpf);

  if (cpfDigitsOnly.length !== 11 || /^(\d)\1{10}$/.test(cpfDigitsOnly)) {
    return false;
  }

  const validateDigit = (partialCpf: string): number => {
    const digits = partialCpf.split("").map(Number);
    const sum = digits.reduce(
      (acc, digit, index) => acc + digit * (digits.length + 1 - index),
      0
    );
    return ((sum * 10) % 11) % 10;
  };

  const firstDigit = validateDigit(cpfDigitsOnly.slice(0, 9));
  const secondDigit = validateDigit(cpfDigitsOnly.slice(0, 10));

  return (
    firstDigit === Number(cpfDigitsOnly[9]) &&
    secondDigit === Number(cpfDigitsOnly[10])
  );
};
