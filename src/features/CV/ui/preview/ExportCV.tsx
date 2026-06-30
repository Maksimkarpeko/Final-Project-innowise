"use client";

import { FC } from "react";
import { Button, message } from "antd";
import { useMutation } from "@apollo/client/react";

import { EXPORT_PDF } from "@/src/entities/cv/api/cv.api";
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
            <script src="https://cdn.tailwindcss.com"></script>
          </head>
          <body>
            <div class="p-8">${contentElement}</div>
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

      if (!responseString) {
        throw new Error("No data received from server");
      }

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
          className="
        h-[48px]!
        min-w-[170px]!
        rounded-[40px]!
        border!
        border-[#C63031]!
        bg-transparent!
        px-8!
        font-roboto!
        text-[14px]!
        font-medium!
        uppercase!
        leading-[24.5px]!
        tracking-[0.4px]!
        text-[#C63031]!
        transition-colors!

        hover:border-[#D9363E]!
        hover:bg-[#D9363E]/5!
        hover:text-[#D9363E]!

        dark:border-[#D9363E]!
        dark:text-[#D9363E]!
        dark:hover:bg-white/[0.08]!
        dark:hover:text-[#ff5a5f]!
      "
      >
        {t.cv.preview.exportButton}
      </Button>
  );
};