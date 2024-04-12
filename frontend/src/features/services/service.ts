export interface Service {
  id: number;
  name: string;
  color: string;
  duration: number;
}

export const DEFAULT_SERVICE: Service = {
  id: 0,
  name: "",
  color: "",
  duration: 60,
};
