import { deleteProductToast, errorToast, successAddCartToast } from "../components/Toast";

// HTML 문자열을 실제 DOM Node로 변환하는 헬퍼 함수
const stringToDomNode = (htmlString) => {
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  // DocumentFragment의 첫 번째 자식을 반환합니다.
  return template.content.firstChild;
};

export const showToast = (type) => {
  // 1. 토스트 UI의 HTML 문자열을 가져오는 함수
  const getToastHtml = () => {
    if (type === "success") return successAddCartToast();
    if (type === "delete") return deleteProductToast();
    if (type === "error") return errorToast();
    return ""; // 기본값 방어
  };

  // 2. 토스트 루트 컨테이너 찾기 또는 생성
  let toastRootDiv = document.querySelector("#toastRoot");

  // 토스트 루트가 없으면 생성하여 body에 추가
  if (!toastRootDiv) {
    toastRootDiv = document.createElement("div"); // toastRootDiv 변수 재할당
    toastRootDiv.className = "flex flex-col gap-2 items-center justify-center mx-auto";
    toastRootDiv.id = "toastRoot";
    toastRootDiv.style.width = "fit-content";

    toastRootDiv.style.position = "fixed";
    toastRootDiv.style.bottom = "20px";
    toastRootDiv.style.left = "50%";
    toastRootDiv.style.transform = "translateX(-50%)";
    toastRootDiv.style.zIndex = "100";

    document.body.appendChild(toastRootDiv);
  }

  // 3. 토스트 HTML 문자열을 실제 DOM Node로 변환
  const toastNode = stringToDomNode(getToastHtml());

  // 4. 변환된 Node를 루트 컨테이너에 추가 (나열됨)
  if (toastNode) {
    toastRootDiv.appendChild(toastNode);

    // 5. 3초 후 토스트 제거 타이머 설정
    setTimeout(() => {
      // 3초 후, 해당 토스트 노드에 직접 .remove() 호출
      toastNode.remove();
      toastRootDiv.remove();
    }, 3000);
  }
};
