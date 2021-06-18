import { TIME_OUT_SEC } from "./help_config";

export function timeOut(s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Take too long! Time: ${s}`));
    }, s * 1000);
  });
}

// export async function getJson(url) {
//   try {
//     const res = await Promise.race([fetch(url), timeOut(TIME_OUT_SEC)]);
//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return await res.json();
//   } catch (e) {
//     console.error(e);
//     throw e;
//   }
// }

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeOut(TIME_OUT_SEC)]);

    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
