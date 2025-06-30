import * as SQLite from 'expo-sqlite';

export async function openDatabase(name: string = 'app.db') {
  return SQLite.openDatabaseAsync(name);
}

export type SQLiteDatabase = Awaited<ReturnType<typeof openDatabase>>; 