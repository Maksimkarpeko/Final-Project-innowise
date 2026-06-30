"use client";
import { EXPORT_PDF } from "@/src/entities/cv/api/cv.api";
import { useMutation } from "@apollo/client/react";
import { Button, message } from "antd";
import { FC } from "react";
import { useLocale } from "@/src/shared";

type ExportCVProps = {
  elementId: string;
  fileName?: string;
};

type ExportResponse = {
  exportPdf: string;
};

export const ExportCV: FC<ExportCVProps> = ({
  elementId,
  fileName = "document.pdf",
}) => {
  const { t } = useLocale();
  const [exportPdf, { loading }] = useMutation<ExportResponse>(EXPORT_PDF);

  const handleExport = async () => {
    const element = document.getElementById(elementId);
    if (!element) {
      message.error(t.cv.preview.errors.elementNotFound);
      return;
    }
    try {
      const contentElement = element.innerHTML;
      const fullHtml = `
        <html>
          <head>
            <meta charset="utf-8">
            <script src="https://cdn.tailwindcss.com"></script> </head>
          <body>
            <div className="p-8">${contentElement}</div>
          </body>
        </html>
      `;
      const { data } = await exportPdf({
        variables: {
          pdf: {
            html: fullHtml,
            margin: {
              top: "20px",
              bottom: "20px",
              left: "20px",
              right: "20px",
            },
          },
        },
      });
      const responseString = data?.exportPdf;
      if (!responseString) throw new Error("No data received from server");
      if (responseString.startsWith("http")) {
        window.open(responseString, "_blank");
      } else {
        const link = document.createElement("a");
        link.href = `data:application/pdf;base64,${responseString}`;
        link.download = fileName;
        link.click();
      }
      message.success(t.cv.preview.success.exported);
    } catch (error) {
      console.error(error);
      message.error(t.cv.preview.errors.exportFailed);
    }
  };

  return (
    <Button
      loading={loading}
      onClick={handleExport}
      className="border! border-red-500! text-red-500! font-medium! text-xs! px-4! py-2! rounded! uppercase! tracking-wider! hover:bg-red-50! hover:text-red-600! transition-colors!"
    >
      {t.cv.preview.exportButton}
    </Button>
  );
};
