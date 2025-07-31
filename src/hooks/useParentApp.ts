declare global {
  interface Window {
    global: {
      setUserName?: (name: string|null|undefined) => void;
      getUserName?: () => string |null|undefined;
    };
  }
}

export const useUser = () => {
  const setUserName = (name: string|null|undefined) => {
    window.global?.setUserName?.(name ?? "Cliente");
  };

  const getUserName = () => {
    return window.global?.getUserName?.() ?? "Cliente";
  };

  return { setUserName, getUserName };
};
