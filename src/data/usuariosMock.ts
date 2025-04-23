export const usuariosMock = Array.from({ length: 50 }, (_, index) => ({
  id: (index + 1).toString(), // Convertir a string para coincidir con la interfaz
  nombre: `Usuario ${index + 1}`,
  apellidos: `Apellido ${index + 1}`,
  email: `usuario${index + 1}@ejemplo.com`,
  rol_id: 1,
  rol_nombre: 'Usuario',
  activo: true,
  creado_en: new Date().toISOString(),
}));
