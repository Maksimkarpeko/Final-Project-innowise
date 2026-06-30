"use client";

import { FC } from "react";
import { useQuery } from "@apollo/client/react";

import { GET_USER_CVS } from "@/src/entities";
import {
  getProficiencyLabel,
  getUserId,
  UserResponse,
  useLocale,
} from "@/src/shared";

import { ExportCV } from "./ExportCV";

type CVPreviewInfoProps = {
  cvId: string;
};

export const CVPreviewInfo: FC<CVPreviewInfoProps> = ({ cvId }) => {
  const userId = getUserId();
  const { t, locale } = useLocale();

  const { data, loading } = useQuery<UserResponse>(GET_USER_CVS, {
    variables: {
      userId,
    },
    skip: !userId,
  });

  if (loading) {
    return <>{t.common.loading}</>;
  }

  const activeCV = data?.user.cvs.find((cv) => cv.id === cvId);

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);

    return date.toLocaleDateString(locale === "ru" ? "ru-RU" : "en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const domains = Array.from(
      new Set(activeCV?.projects?.map((p) => p.domain || p.project?.domain) ?? []),
  ).filter(Boolean);

  return (
      <div className="px-8 pb-16 pt-8">
        <div
            id="pdf-target-content"
            className="
          mx-auto
          max-w-[980px]
          bg-white
          p-8
          font-sans
          text-gray-900
          transition-colors

          dark:bg-[#303030]
          dark:text-white/90
        "
        >
          <div className="mb-12 flex items-start justify-between">
            <div>
              <h1 className="text-[36px] font-normal leading-[42px] tracking-[-0.5px] text-[#2E2E2E] transition-colors dark:text-white/90">
                {data?.user.profile.full_name}
              </h1>

              <p className="mt-1 text-[14px] font-medium uppercase tracking-[0.5px] text-[#2E2E2E] transition-colors dark:text-white/80">
                {activeCV?.name || t.cv.preview.defaultRole}
              </p>
            </div>

            <ExportCV elementId="pdf-target-content" />
          </div>

          <div className="grid grid-cols-[260px_1fr] gap-[32px]">
            <aside className="space-y-6">
              {activeCV?.education && (
                  <div>
                    <h3 className="mb-2 text-[16px] font-bold leading-[24px] text-[#2E2E2E] transition-colors dark:text-white/90">
                      {t.cv.preview.sections.education}
                    </h3>

                    <p className="text-[16px] leading-[24px] text-[#2E2E2E] transition-colors dark:text-white/80">
                      {activeCV.education}
                    </p>
                  </div>
              )}

              {activeCV?.languages && activeCV.languages.length > 0 && (
                  <div>
                    <h3 className="mb-2 text-[16px] font-bold leading-[24px] text-[#2E2E2E] transition-colors dark:text-white/90">
                      {t.cv.preview.sections.languageProficiency}
                    </h3>

                    <p className="text-[16px] leading-[24px] text-[#2E2E2E] transition-colors dark:text-white/80">
                      {activeCV.languages
                          .map(
                              (lang) =>
                                  `${lang.name} (${getProficiencyLabel(t, lang.proficiency)})`,
                          )
                          .join(", ")}
                    </p>
                  </div>
              )}

              {domains.length > 0 && (
                  <div>
                    <h3 className="mb-2 text-[16px] font-bold leading-[24px] text-[#2E2E2E] transition-colors dark:text-white/90">
                      {t.cv.preview.sections.domains}
                    </h3>

                    <p className="text-[16px] leading-[24px] text-[#2E2E2E] transition-colors dark:text-white/80">
                      {domains.join(", ")}
                    </p>
                  </div>
              )}
            </aside>

            <main className="border-l border-[#C63031] pl-[32px]">
              {activeCV?.description && (
                  <section className="mb-8">
                    <h2 className="mb-4 text-[16px] font-bold leading-[24px] text-[#2E2E2E] transition-colors dark:text-white/90">
                      {activeCV.name || t.cv.preview.defaultRole}
                    </h2>

                    <p className="whitespace-pre-line text-[16px] leading-[26px] text-[#2E2E2E] transition-colors dark:text-white/80">
                      {activeCV.description}
                    </p>
                  </section>
              )}

              {activeCV?.skills && activeCV.skills.length > 0 && (
                  <section className="space-y-6">
                    <div>
                      <h3 className="mb-2 text-[16px] font-bold leading-[24px] text-[#2E2E2E] transition-colors dark:text-white/90">
                        {t.cv.preview.sections.skillsTechnologies}
                      </h3>

                      <p className="text-[16px] leading-[24px] text-[#2E2E2E] transition-colors dark:text-white/80">
                        {activeCV.skills.map((skill) => skill.name).join(", ")}.
                      </p>
                    </div>
                  </section>
              )}
            </main>
          </div>

          {activeCV?.projects && activeCV.projects.length > 0 && (
              <section className="mt-16">
                <h2 className="mb-8 text-[36px] font-normal leading-[42px] tracking-[-0.5px] text-[#2E2E2E] transition-colors dark:text-white/90">
                  {t.cv.preview.sections.projects}
                </h2>

                <div className="space-y-10">
                  {activeCV.projects.map((proj, idx) => {
                    const projectName = proj.name || proj.project?.name;
                    const projectDescription =
                        proj.description || proj.project?.description;
                    const projectEnvironment =
                        proj.environment || proj.project?.environment;
                    const startDate = proj.start_date || proj.project?.start_date;
                    const endDate = proj.end_date || proj.project?.end_date;

                    return (
                        <article
                            key={proj.id || idx}
                            className="border-t border-[#E0E0E0] pt-8 transition-colors dark:border-white/10"
                        >
                          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                            <h3 className="text-[20px] font-bold leading-[28px] text-[#2E2E2E] transition-colors dark:text-white/90">
                              {projectName}
                            </h3>

                            <span className="text-[14px] font-medium text-[#767676] transition-colors dark:text-white/55">
                        {formatDate(startDate)} —{" "}
                              {endDate ? formatDate(endDate) : t.cv.preview.date.present}
                      </span>
                          </div>

                          {projectEnvironment && projectEnvironment.length > 0 && (
                              <div className="mb-3 text-[15px] leading-[24px]">
                        <span className="font-semibold text-[#2E2E2E] transition-colors dark:text-white/90">
                          {t.cv.preview.project.environment}{" "}
                        </span>

                                <span className="text-[#767676] transition-colors dark:text-white/70">
                          {projectEnvironment.join(", ")}
                        </span>
                              </div>
                          )}

                          {projectDescription && (
                              <p className="mb-4 whitespace-pre-line text-[15px] leading-[24px] text-[#767676] transition-colors dark:text-white/70">
                                {projectDescription}
                              </p>
                          )}

                          {proj.responsibilities &&
                              proj.responsibilities.length > 0 && (
                                  <div>
                          <span className="text-[15px] font-semibold text-[#2E2E2E] transition-colors dark:text-white/90">
                            {t.cv.preview.project.responsibilities}
                          </span>

                                    <ul className="mt-2 list-inside list-disc space-y-1 text-[15px] leading-[24px] text-[#767676] transition-colors dark:text-white/70">
                                      {proj.responsibilities.map((resp, rIdx) => (
                                          <li key={rIdx}>{resp}</li>
                                      ))}
                                    </ul>
                                  </div>
                              )}
                        </article>
                    );
                  })}
                </div>
              </section>
          )}
        </div>
      </div>
  );
};