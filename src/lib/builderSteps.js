// The Project Builder's steps (/see-what-fits), shared so every progress indicator uses
// the same names. A catalogue build adds its own two steps in front.
export const BUILDER_STEPS = [
  "Property",
  "Project Size",
  "Configuration",
  "Build Your Project",
  "Expected Budget",
  "Proceed",
];

export const CATALOGUE_STEPS = ["Your Model", "Finishes", ...BUILDER_STEPS];
