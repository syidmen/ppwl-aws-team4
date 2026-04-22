export interface DbClient {
  user: {
    findMany: () => Promise<any[]>;
  };
  // tambah model & method lain sesuai kebutuhan
}