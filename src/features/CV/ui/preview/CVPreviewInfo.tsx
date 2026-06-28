"use client";
import { GET_USER_CVS } from "@/src/entities";
import { getUserId, UserResponse } from "@/src/shared";
import { useQuery } from "@apollo/client/react";
import { FC } from "react";
import { ExportCV } from "./ExportCV";

type CVPreviewInfoProps = {
  cvId: string;
};

export const CVPreviewInfo: FC<CVPreviewInfoProps> = ({ cvId }) => {
  const userId = getUserId();
  const { data, loading } = useQuery<UserResponse>(GET_USER_CVS, {
    variables: {
      userId,
    },
    skip: !userId,
  });

  if (loading) {
    return <>Loading...</>;
  }
  const activeCV = data?.user.cvs.find((cv) => cv.id === cvId);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      className="bg-white text-gray-900 p-8 font-sans"
      id="pdf-target-content"
    >
      <div className="flex justify-between items-start border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-950 uppercase">
            {data?.user.profile.full_name}
          </h1>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-1">
            {activeCV?.name || "Software Engineer"}
          </p>
        </div>
        <ExportCV elementId="pdf-target-content" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start py-4">
        <div className="space-y-6 md:col-span-1">
          {activeCV?.education && (
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">
                Education
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {activeCV?.education}
              </p>
            </div>
          )}

          {activeCV?.languages && activeCV?.languages.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">
                Language proficiency
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {activeCV.languages
                  .map((lang) => `${lang.name} (${lang.proficiency})`)
                  .join(", ")}
              </p>
            </div>
          )}

          {activeCV?.projects && activeCV?.projects.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">
                Domains
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {Array.from(
                  new Set(
                    activeCV.projects.map((p) => p.domain || p.project?.domain),
                  ),
                )
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>
          )}
        </div>

        <div className="md:col-span-2 space-y-6 border-l-0 md:border-l border-red-500 md:border-red-500 md:pl-8">
          {activeCV?.description && (
            <div className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">
                {activeCV?.name || "Software Engineer"}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {activeCV?.description}
              </p>
            </div>
          )}

          {activeCV?.skills && activeCV?.skills.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="space-y-3">
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Skills & Technologies
                  </h3>
                  <p className="text-gray-800 text-sm font-medium">
                    {activeCV?.skills.map((skill) => skill.name).join(", ")}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {activeCV?.projects && activeCV?.projects.length > 0 && (
        <div className="border-t border-gray-200 pt-8 ">
          <h2 className="text-2xl font-bold tracking-tight text-gray-950">
            Projects
          </h2>

          <div className="divide-y divide-gray-100">
            {activeCV?.projects.map((proj, idx) => {
              const projectName = proj.name || proj.project?.name;
              const projectDescription =
                proj.description || proj.project?.description;
              const projectEnvironment =
                proj.environment || proj.project?.environment;
              const startDate = proj.start_date || proj.project?.start_date;
              const endDate = proj.end_date || proj.project?.end_date;

              return (
                <div
                  key={proj.id || idx}
                  className={`${idx > 0 ? "pt-8" : ""} space-y-3`}
                >
                  <div className="flex flex-wrap justify-between items-baseline gap-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      {projectName}
                    </h3>
                    <span className="text-sm text-gray-500 font-medium">
                      {formatDate(startDate)} —{" "}
                      {endDate ? formatDate(endDate) : "Present"}
                    </span>
                  </div>

                  {proj.roles && proj.roles.length > 0 && (
                    <div className="text-sm">
                      <span className="font-semibold text-gray-700">
                        Role:{" "}
                      </span>
                      <span className="text-gray-600">
                        {proj.roles.join(", ")}
                      </span>
                    </div>
                  )}

                  {projectEnvironment && projectEnvironment.length > 0 && (
                    <div className="text-sm">
                      <span className="font-semibold text-gray-700">
                        Environment:{" "}
                      </span>
                      <span className="text-gray-600">
                        {projectEnvironment.join(", ")}
                      </span>
                    </div>
                  )}

                  {projectDescription && (
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                      {projectDescription}
                    </p>
                  )}
                  {proj.responsibilities &&
                    proj.responsibilities.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-sm font-semibold text-gray-700">
                          Responsibilities:
                        </span>
                        <ul className="list-disc list-inside text-gray-600 text-sm space-y-0.5 pl-2">
                          {proj.responsibilities.map((resp, rIdx) => (
                            <li key={rIdx}>{resp}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
