"use client";

import { useEffect, useRef } from "react";

export default function ConfirmDialog({ id }: { id: string }) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  console.log("confirm dialog", id);

  useEffect(() => {
    console.log("init");
    const init = async () => {
      const { Popconfirm, initTE } = await import("tw-elements");
      initTE({ Popconfirm });
    };
    init();
  }, [id]);

  useEffect(() => {
    console.log("buttonRef");
    buttonRef.current.addEventListener("confirm.te.popconfirm", handleOk);

    return () => {
      buttonRef.current.removeEventListener("confirm.te.popconfirm", handleOk);
    };

    // if (buttonRef && buttonRef.current) {
    //   buttonRef.current.addEventListener("confirm.te.popconfirm", handleOk);
    //   return () => {
    //     buttonRef.current.removeEventListener("confirm.te.popconfirm", handleOk);
    //   };
    // }
  }, [id]);

  const handleOk = (a) => {
    console.log("a", a);
  };

  return (
    <>
      {buttonRef && (
        <button
          ref={buttonRef}
          type="button"
          data-te-index={id}
          data-te-ripple-init
          data-te-ripple-color="light"
          data-te-toggle="popconfirm"
          data-te-popconfirm-mode="modal"
          className="mr-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Modal
        </button>
      )}
    </>
  );
}
