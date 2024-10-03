export class User {
  id: string;
  email: string | null;
  name: string | null;
  photoURL: string | null;
  emailVerified: boolean;

  constructor(params: {
    id: string;
    email: string | null;
    name: string | null;
    photoURL: string | null;
    emailVerified: boolean;
  }) {
    this.id = params.id;
    this.email = params.email;
    this.name = params.name;
    this.photoURL = params.photoURL;
    this.emailVerified = params.emailVerified;
  }

  static fromFirebaseUser(user: any) {
    return new User({
      id: user.uid,
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    });
  }
  static fromSupabaseUser(user: any, datas: any) {
    // {"app_metadata": {"provider": "email", "providers": ["email"]}, "aud": "authenticated", "confirmation_sent_at": "2024-09-29T17:34:26.595575Z", "confirmed_at": "2024-09-29T17:36:45.962878Z", "created_at": "2024-09-29T17:34:26.569275Z", "email": "perroaa94@gmail.com", "email_confirmed_at": "2024-09-29T17:36:45.962878Z", "id": "51f4acb1-c20c-42e6-a82f-58e0ae738054", "identities": [{"created_at": "2024-09-29T17:34:26.585239Z", "email": "perroaa94@gmail.com", "id": "51f4acb1-c20c-42e6-a82f-58e0ae738054", "identity_data": [Object], "identity_id": "0a92b1d0-e7d6-496f-971c-67a54b410a94", "last_sign_in_at": "2024-09-29T17:34:26.585183Z", "provider": "email", "updated_at": "2024-09-29T17:34:26.585239Z", "user_id": "51f4acb1-c20c-42e6-a82f-58e0ae738054"}], "is_anonymous": false, "last_sign_in_at": "2024-09-29T17:45:16.28731599Z", "phone": "", "role": "authenticated", "updated_at": "2
    //Datas  {"avatar_url": null, "full_name": null, "id": "51f4acb1-c20c-42e6-a82f-58e0ae738054", "updated_at": null, "username": null, "website": null}
    return new User({
      id: user.id,
      email: user.email,
      name: datas.full_name,
      photoURL: datas.avatar_url,
      emailVerified: user.emailVerified,
    });
  }
}
