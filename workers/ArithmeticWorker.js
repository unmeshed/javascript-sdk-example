
  export const ArithmeticOperation = async (
    input
  ) => {
    const { operation, num1, num2 } = input;
  
    console.info(`Performing ${operation} operation on ${num1} and ${num2}`);
  
    switch (operation.toLowerCase()) {
      case "add":
        return { result: num1 + num2 };
      case "subtract":
        return { result: num1 - num2 };
      case "multiply":
        return { result: num1 * num2 };
      case "divide":
        if (num2 === 0) {
          throw new Error("Division by zero is not allowed");
        }
        return { result: num1 / num2 };
      default:
        throw new Error("Invalid operation");
    }
  };
  