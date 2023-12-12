export interface GoogleProfile {
  emails: { value: string; type: string }[];
  name: { givenName: string; familyName: string };
  photos: { value: string; type: string }[];
}
