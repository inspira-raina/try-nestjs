export default {
  user_id: {
    must_two_user: {
      code: 'ROOM_USER_MUST_TWO_USER',
      message: 'Pengguna dalam ruangan harus terdiri dari dua orang',
    },
    must_not_admin: {
      code: 'ROOM_USER_MUST_NOT_ADMIN',
      message: 'ID pengguna tidak boleh merupakan admin',
    },
    not_allowed: {
      code: 'USER_NOT_ALLOWED',
      message: 'Pengguna tidak diizinkan untuk melakukan tindakan ini',
    },
    should_not_admin: {
      code: 'USER_SHOULD_NOT_ADMIN',
      message: 'Pengguna tidak seharusnya merupakan admin',
    },
  },
  room_id: {
    invalid: {
      code: 'ROOM_ID_INVALID',
      message: 'Format ID ruangan tidak valid',
    },
    not_found: {
      code: 'ROOM_NOT_FOUND',
      message: 'Ruangan tidak ditemukan',
    },
    private_cannot_remove_member: {
      code: 'ROOM_PRIVATE_CANNOT_REMOVE_MEMBER',
      message: 'Ruangan pribadi tidak dapat mengeluarkan anggotanya',
    },
    blocked: {
      code: 'ROOM_BLOCKED',
      message: 'Ruangan diblokir dan tidak dapat diakses',
    },
  },
  type: {
    should_be_community: {
      code: 'ROOM_TYPE_SHOULD_BE_COMMUNITY',
      message: 'Tipe ruangan harus berupa Komunitas',
    },
  },
};
