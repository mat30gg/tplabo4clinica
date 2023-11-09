import { ConexionFirestore } from './conexion-firestore';

describe('ConexionFirestore', () => {
  it('should create an instance', () => {
    expect(new ConexionFirestore()).toBeTruthy();
  });
});
