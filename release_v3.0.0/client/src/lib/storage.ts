/**
 * Type definition for app settings
 */
export interface AppSettings {
  modelUrl: string;
  pose1Image: string | null;
  pose2Image: string | null;
  pose3Image: string | null;
}

/**
 * Default app settings
 */
const defaultSettings: AppSettings = {
  modelUrl: 'https://teachablemachine.withgoogle.com/models/gIF64n3nR/',
  pose1Image: null,
  pose2Image: null,
  pose3Image: null
};

/**
 * Save app settings to local storage
 */
export function saveSettings(settings: AppSettings): void {
  localStorage.setItem('yogaAppSettings', JSON.stringify(settings));
}

/**
 * Load app settings from local storage
 */
export function loadSettings(): AppSettings {
  const storedSettings = localStorage.getItem('yogaAppSettings');
  if (!storedSettings) {
    return { ...defaultSettings };
  }

  try {
    const parsedSettings = JSON.parse(storedSettings) as Partial<AppSettings>;
    // Merge with default settings to ensure all fields exist
    return {
      ...defaultSettings,
      ...parsedSettings
    };
  } catch (error) {
    console.error('Error parsing settings:', error);
    return { ...defaultSettings };
  }
}

/**
 * Get the URL for a pose image, either from local storage or default
 */
export function getPoseImageUrl(poseNumber: 1 | 2 | 3, settings: AppSettings): string {
  const imageKey = `pose${poseNumber}Image` as keyof AppSettings;
  const storedImage = settings[imageKey] as string | null;
  
  // If user has uploaded a custom image, use that
  if (storedImage) {
    return storedImage;
  }
  
  // Otherwise use the default images from assets (imported in components)
  return ''; // Components will use their imported assets
}