import { Runtime } from "lib/runtime";

export async function closePopup() {
  try {
    window.close();
  } catch {
    ////
  }

  try {
    const { id } = await Runtime.windows.getCurrent();
    Runtime.windows.remove(id, console.error);
  } catch {
    ////
  }
}
