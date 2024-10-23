// useCalculadora.test.js
import { useCalculadora } from "@/lib/Hooks/useCalculadora";
import { act, renderHook } from "@testing-library/react-native";

describe("useCalculadora Hook", () => {
  it("debería iniciar con valores iniciales", () => {
    const { result } = renderHook(() => useCalculadora());
    expect(result.current.state.currentValue).toBe("0");
    expect(result.current.state.operator).toBeNull();
    expect(result.current.state.previousValue).toBe("0");
  });

  it("debería actualizar el valor cuando se ingresan números", () => {
    const { result } = renderHook(() => useCalculadora());

    act(() => result.current.handleNumberClick("5"));
    expect(result.current.state.currentValue).toBe("5");

    act(() => result.current.handleNumberClick("7"));
    expect(result.current.state.currentValue).toBe("57");
  });

  it("debería manejar operaciones de suma correctamente", () => {
    const { result } = renderHook(() => useCalculadora());

    act(() => result.current.handleNumberClick("5"));
    act(() => result.current.handleOperatorClick("+"));
    act(() => result.current.handleNumberClick("3"));
    act(() => result.current.handleEqualClick());

    expect(result.current.state.currentValue).toBe("8");
  });

  it("debería manejar operaciones de resta correctamente", () => {
    const { result } = renderHook(() => useCalculadora());

    act(() => result.current.handleNumberClick("5"));
    act(() => result.current.handleOperatorClick("-"));
    act(() => result.current.handleNumberClick("10"));
    act(() => result.current.handleEqualClick());

    expect(result.current.state.currentValue).toBe("-5");
  });

  it("debería manejar multiplicaciones correctamente", () => {
    const { result } = renderHook(() => useCalculadora());

    act(() => result.current.handleNumberClick("4"));
    act(() => result.current.handleOperatorClick("*"));
    act(() => result.current.handleNumberClick("5"));
    act(() => result.current.handleEqualClick());

    expect(result.current.state.currentValue).toBe("20");
  });

  it("debería manejar divisiones correctamente", () => {
    const { result } = renderHook(() => useCalculadora());

    act(() => result.current.handleNumberClick("8"));
    act(() => result.current.handleOperatorClick("/"));
    act(() => result.current.handleNumberClick("4"));
    act(() => result.current.handleEqualClick());

    expect(result.current.state.currentValue).toBe("2");
  });

  it("debería manejar divisiones por decimales", () => {
    const { result } = renderHook(() => useCalculadora());

    act(() => result.current.handleNumberClick("5"));
    act(() => result.current.handleOperatorClick("/"));
    act(() => result.current.handleNumberClick("2"));
    act(() => result.current.handleEqualClick());

    expect(result.current.state.currentValue).toBe("2,5");
  });

  it("debería manejar operaciones de suma después de un resultado", () => {
    const { result } = renderHook(() => useCalculadora());

    act(() => result.current.handleNumberClick("10"));
    act(() => result.current.handleOperatorClick("+"));
    act(() => result.current.handleNumberClick("5"));
    act(() => result.current.handleEqualClick());

    act(() => result.current.handleOperatorClick("+"));
    act(() => result.current.handleNumberClick("3"));
    act(() => result.current.handleEqualClick());

    expect(result.current.state.currentValue).toBe("18");
  });

  it("debería manejar operaciones con decimales", () => {
    const { result } = renderHook(() => useCalculadora());

    act(() => result.current.handleNumberClick("5"));
    act(() => result.current.handleNumberClick("."));
    act(() => result.current.handleNumberClick("2"));
    act(() => result.current.handleNumberClick("2"));
    act(() => result.current.handleOperatorClick("*"));
    act(() => result.current.handleNumberClick("3"));
    act(() => result.current.handleEqualClick());

    expect(result.current.state.currentValue).toBe("15,66");
  });

  it("debería manejar el borrado de la calculadora", () => {
    const { result } = renderHook(() => useCalculadora());

    act(() => result.current.handleNumberClick("5"));
    act(() => result.current.handleClearClick());
    expect(result.current.state.currentValue).toBe("0");
  });

  it("deberia de retornarme el porcentage correctamente", () => {
    const { result } = renderHook(() => useCalculadora());

    act(() => result.current.handleNumberClick("2"));
    act(() => result.current.handleNumberClick("5"));
    act(() => result.current.handleTap("percentage"));
    expect(result.current.state.currentValue).toBe("0,25");
  });
});
