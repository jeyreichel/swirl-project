export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string
          country: string
          first_name: string
          id: string
          id_orders: string | null
          last_name: string
          phone: string
          state: string
          street: string
          zip: string
        }
        Insert: {
          city: string
          country: string
          first_name: string
          id?: string
          id_orders?: string | null
          last_name: string
          phone: string
          state: string
          street: string
          zip: string
        }
        Update: {
          city?: string
          country?: string
          first_name?: string
          id?: string
          id_orders?: string | null
          last_name?: string
          phone?: string
          state?: string
          street?: string
          zip?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_fk"
            columns: ["id_orders"]
            referencedRelation: "orders"
            referencedColumns: ["id"]
          }
        ]
      }
      answers: {
        Row: {
          created_at: string
          id: string
          nft: string | null
          pending_user: string | null
          survey_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          nft?: string | null
          pending_user?: string | null
          survey_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          nft?: string | null
          pending_user?: string | null
          survey_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "answers_pending_users_id_fk"
            columns: ["pending_user"]
            referencedRelation: "pending_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_surveys_id_fk"
            columns: ["survey_id"]
            referencedRelation: "surveys"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_users_id_fk"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      api_keys: {
        Row: {
          exp: string
          id: string
          user: string
        }
        Insert: {
          exp: string
          id?: string
          user: string
        }
        Update: {
          exp?: string
          id?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_users_id_fk"
            columns: ["user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      api_partners: {
        Row: {
          id: string
          name: string
          secret_key: string
        }
        Insert: {
          id?: string
          name: string
          secret_key: string
        }
        Update: {
          id?: string
          name?: string
          secret_key?: string
        }
        Relationships: []
      }
      available_purchases: {
        Row: {
          amount: number
          id: string
          id_surveys: string
        }
        Insert: {
          amount: number
          id?: string
          id_surveys: string
        }
        Update: {
          amount?: number
          id?: string
          id_surveys?: string
        }
        Relationships: [
          {
            foreignKeyName: "surveys_fk"
            columns: ["id_surveys"]
            referencedRelation: "surveys"
            referencedColumns: ["id"]
          }
        ]
      }
      bets: {
        Row: {
          id_competitions: string
          id_users: string
          wager: number
        }
        Insert: {
          id_competitions: string
          id_users: string
          wager: number
        }
        Update: {
          id_competitions?: string
          id_users?: string
          wager?: number
        }
        Relationships: [
          {
            foreignKeyName: "competitions_fk"
            columns: ["id_competitions"]
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_fk"
            columns: ["id_users"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      blog_posts: {
        Row: {
          content: string
          cover_image_url: string | null
          created_at: string
          id: string
          project_id: string
          slug: string
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          cover_image_url?: string | null
          created_at?: string
          id?: string
          project_id: string
          slug: string
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          cover_image_url?: string | null
          created_at?: string
          id?: string
          project_id?: string
          slug?: string
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_projects_id_fk"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string
          deleted: boolean
          id: string
          reply_to: string | null
          treatment_id: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          deleted?: boolean
          id?: string
          reply_to?: string | null
          treatment_id: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          deleted?: boolean
          id?: string
          reply_to?: string | null
          treatment_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_comments_id_fk"
            columns: ["reply_to"]
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_treatments_id_fk"
            columns: ["treatment_id"]
            referencedRelation: "treatments"
            referencedColumns: ["id"]
          }
        ]
      }
      competitions: {
        Row: {
          created_at: string | null
          id: string
          start_time: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          start_time: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          start_time?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      competitions_contestants: {
        Row: {
          id_competitions: string
          id_contestants: string
        }
        Insert: {
          id_competitions: string
          id_contestants: string
        }
        Update: {
          id_competitions?: string
          id_contestants?: string
        }
        Relationships: [
          {
            foreignKeyName: "competitions_fk"
            columns: ["id_competitions"]
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contestants_fk"
            columns: ["id_contestants"]
            referencedRelation: "contestants"
            referencedColumns: ["id"]
          }
        ]
      }
      contestants: {
        Row: {
          id: string
          name: string | null
        }
        Insert: {
          id?: string
          name?: string | null
        }
        Update: {
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      decryption_keys: {
        Row: {
          id: string
          key: string
        }
        Insert: {
          id?: string
          key: string
        }
        Update: {
          id?: string
          key?: string
        }
        Relationships: []
      }
      donations: {
        Row: {
          address: string
          amount: number
          created_at: string
          id: string
          project_id: string
          tx_hash: string
          user_id: string | null
        }
        Insert: {
          address: string
          amount: number
          created_at?: string
          id?: string
          project_id: string
          tx_hash: string
          user_id?: string | null
        }
        Update: {
          address?: string
          amount?: number
          created_at?: string
          id?: string
          project_id?: string
          tx_hash?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donations_projects_id_fk"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_users_id_fk"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      files_dec: {
        Row: {
          id: number
          key: string
          nonce: string
          path: string
          user_id: string
        }
        Insert: {
          id?: number
          key: string
          nonce: string
          path: string
          user_id: string
        }
        Update: {
          id?: number
          key?: string
          nonce?: string
          path?: string
          user_id?: string
        }
        Relationships: []
      }
      items: {
        Row: {
          id: string
          id_orders: string | null
          product_id: string
          status: Database["public"]["Enums"]["order_status"]
          updated_at: string
        }
        Insert: {
          id?: string
          id_orders?: string | null
          product_id: string
          status?: Database["public"]["Enums"]["order_status"]
          updated_at?: string
        }
        Update: {
          id?: string
          id_orders?: string | null
          product_id?: string
          status?: Database["public"]["Enums"]["order_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_fk"
            columns: ["id_orders"]
            referencedRelation: "orders"
            referencedColumns: ["id"]
          }
        ]
      }
      ledger: {
        Row: {
          amount: number
          created_at: string
          id: string
          id_users: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          id_users: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          id_users?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_fk"
            columns: ["id_users"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      many_available_purchases_has_many_purchase_history: {
        Row: {
          id_available_purchases: string
          id_purchase_history: string
        }
        Insert: {
          id_available_purchases: string
          id_purchase_history: string
        }
        Update: {
          id_available_purchases?: string
          id_purchase_history?: string
        }
        Relationships: []
      }
      multiple_choice_options: {
        Row: {
          id: string
          option: string
          order: number
          question_id: string
        }
        Insert: {
          id?: string
          option: string
          order?: number
          question_id: string
        }
        Update: {
          id?: string
          option?: string
          order?: number
          question_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "multiple_choice_options_questions_id_fk"
            columns: ["question_id"]
            referencedRelation: "questions"
            referencedColumns: ["id"]
          }
        ]
      }
      notifications: {
        Row: {
          cleared: boolean
          id: string
          issued_at: string
          notification_content: string
          url: string | null
          user_id: string
          viewed: boolean
        }
        Insert: {
          cleared?: boolean
          id?: string
          issued_at?: string
          notification_content: string
          url?: string | null
          user_id: string
          viewed?: boolean
        }
        Update: {
          cleared?: boolean
          id?: string
          issued_at?: string
          notification_content?: string
          url?: string | null
          user_id?: string
          viewed?: boolean
        }
        Relationships: []
      }
      orders: {
        Row: {
          client_secret: string
          created_at: string
          id: string
          id_users: string
          payment_intent: string
          shipping_info: string | null
          status: Database["public"]["Enums"]["order_status"]
          updated_at: string
        }
        Insert: {
          client_secret: string
          created_at?: string
          id?: string
          id_users: string
          payment_intent: string
          shipping_info?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          updated_at?: string
        }
        Update: {
          client_secret?: string
          created_at?: string
          id?: string
          id_users?: string
          payment_intent?: string
          shipping_info?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_fk"
            columns: ["id_users"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      pending_users: {
        Row: {
          id: string
          name: string | null
          telegram_id: string
        }
        Insert: {
          id?: string
          name?: string | null
          telegram_id: string
        }
        Update: {
          id?: string
          name?: string | null
          telegram_id?: string
        }
        Relationships: []
      }
      product_features: {
        Row: {
          features: string[]
          id: string
          name: string
          product_id: string
        }
        Insert: {
          features: string[]
          id?: string
          name: string
          product_id: string
        }
        Update: {
          features?: string[]
          id?: string
          name?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_features_products_id_fk"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      product_images: {
        Row: {
          id: string
          image_alt: string
          image_src: string
          product_id: string
        }
        Insert: {
          id?: string
          image_alt: string
          image_src: string
          product_id: string
        }
        Update: {
          id?: string
          image_alt?: string
          image_src?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_images_products_id_fk"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          description: string
          id: string
          image_alt: string
          image_src: string
          lead_time: number
          name: string
          price: number
          rating: number
          stock: number
        }
        Insert: {
          description?: string
          id?: string
          image_alt: string
          image_src: string
          lead_time?: number
          name: string
          price: number
          rating?: number
          stock?: number
        }
        Update: {
          description?: string
          id?: string
          image_alt?: string
          image_src?: string
          lead_time?: number
          name?: string
          price?: number
          rating?: number
          stock?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          telegram_id: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          telegram_id?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          telegram_id?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      progress: {
        Row: {
          attachments: string[] | null
          author: string
          bloodwork: string[] | null
          content: string
          created_at: string
          id: string
          title: string | null
          updated_at: string
        }
        Insert: {
          attachments?: string[] | null
          author: string
          bloodwork?: string[] | null
          content: string
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          attachments?: string[] | null
          author?: string
          bloodwork?: string[] | null
          content?: string
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      progress_trial_association: {
        Row: {
          is_associated: boolean
          progress_id: string
          trial_id: string
        }
        Insert: {
          is_associated: boolean
          progress_id: string
          trial_id: string
        }
        Update: {
          is_associated?: boolean
          progress_id?: string
          trial_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "progress_trial_association_progress_id_fk"
            columns: ["progress_id"]
            referencedRelation: "progress"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "progress_trial_association_trials_id_fk"
            columns: ["trial_id"]
            referencedRelation: "trials"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          abstract: string
          cover_image_url: string
          created_at: string
          featured: boolean
          id: string
          name: string
          owner_id: string | null
          project_type: string | null
          short_description: string | null
          team: string | null
          updated_at: string
          wallet_id: string | null
        }
        Insert: {
          abstract: string
          cover_image_url: string
          created_at?: string
          featured?: boolean
          id?: string
          name: string
          owner_id?: string | null
          project_type?: string | null
          short_description?: string | null
          team?: string | null
          updated_at?: string
          wallet_id?: string | null
        }
        Update: {
          abstract?: string
          cover_image_url?: string
          created_at?: string
          featured?: boolean
          id?: string
          name?: string
          owner_id?: string | null
          project_type?: string | null
          short_description?: string | null
          team?: string | null
          updated_at?: string
          wallet_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_owner_id_fkey"
            columns: ["owner_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_wallet_id_fkey"
            columns: ["wallet_id"]
            referencedRelation: "wallet"
            referencedColumns: ["id"]
          }
        ]
      }
      purchase_history: {
        Row: {
          created_at: string
          id: string
          id_users: string | null
          status: Database["public"]["Enums"]["purchase_status"]
        }
        Insert: {
          created_at?: string
          id?: string
          id_users?: string | null
          status?: Database["public"]["Enums"]["purchase_status"]
        }
        Update: {
          created_at?: string
          id?: string
          id_users?: string | null
          status?: Database["public"]["Enums"]["purchase_status"]
        }
        Relationships: []
      }
      purchase_wallets: {
        Row: {
          address: string
          id: string
          id_purchase_history: string | null
          private_key: string
        }
        Insert: {
          address: string
          id?: string
          id_purchase_history?: string | null
          private_key: string
        }
        Update: {
          address?: string
          id?: string
          id_purchase_history?: string | null
          private_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchase_history_fk"
            columns: ["id_purchase_history"]
            referencedRelation: "purchase_history"
            referencedColumns: ["id"]
          }
        ]
      }
      questions: {
        Row: {
          hidden: boolean
          id: string
          order: number
          question: string
          required: boolean
          survey_id: string | null
          type: Database["public"]["Enums"]["question_type"]
        }
        Insert: {
          hidden?: boolean
          id?: string
          order?: number
          question: string
          required: boolean
          survey_id?: string | null
          type: Database["public"]["Enums"]["question_type"]
        }
        Update: {
          hidden?: boolean
          id?: string
          order?: number
          question?: string
          required?: boolean
          survey_id?: string | null
          type?: Database["public"]["Enums"]["question_type"]
        }
        Relationships: [
          {
            foreignKeyName: "questions_surveys_id_fk"
            columns: ["survey_id"]
            referencedRelation: "surveys"
            referencedColumns: ["id"]
          }
        ]
      }
      shipped_orders: {
        Row: {
          carrier: string
          id: string
          tracking_number: string
        }
        Insert: {
          carrier: string
          id?: string
          tracking_number: string
        }
        Update: {
          carrier?: string
          id?: string
          tracking_number?: string
        }
        Relationships: []
      }
      survey_progress: {
        Row: {
          answer_id: string
          id: string
          progress: number
          survey_id: string
          user: string
        }
        Insert: {
          answer_id: string
          id?: string
          progress: number
          survey_id: string
          user: string
        }
        Update: {
          answer_id?: string
          id?: string
          progress?: number
          survey_id?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "survey_progress_answers_id_fk"
            columns: ["answer_id"]
            referencedRelation: "answers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "survey_progress_surveys_id_fk"
            columns: ["survey_id"]
            referencedRelation: "surveys"
            referencedColumns: ["id"]
          }
        ]
      }
      surveys: {
        Row: {
          created_at: string
          description: string
          id: string
          nft: string | null
          project_id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          nft?: string | null
          project_id: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          nft?: string | null
          project_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "surveys_projects_id_fk"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      treatments: {
        Row: {
          attachments: string[] | null
          author: string
          bloodwork: string[] | null
          content: string
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          attachments?: string[] | null
          author: string
          bloodwork?: string[] | null
          content: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          attachments?: string[] | null
          author?: string
          bloodwork?: string[] | null
          content?: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      treatments_votes: {
        Row: {
          id: string
          treatment_id: string
          user_id: string
          value: Database["public"]["Enums"]["reaction_type"]
        }
        Insert: {
          id?: string
          treatment_id: string
          user_id: string
          value: Database["public"]["Enums"]["reaction_type"]
        }
        Update: {
          id?: string
          treatment_id?: string
          user_id?: string
          value?: Database["public"]["Enums"]["reaction_type"]
        }
        Relationships: [
          {
            foreignKeyName: "treatments_votes_treatments_id_fk"
            columns: ["treatment_id"]
            referencedRelation: "treatments"
            referencedColumns: ["id"]
          }
        ]
      }
      trials: {
        Row: {
          content: string
          id: string
          title: string
        }
        Insert: {
          content: string
          id?: string
          title: string
        }
        Update: {
          content?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
      user_responses: {
        Row: {
          answer_id: string
          decryption_key: string | null
          id: string
          question_id: string
          response: string
        }
        Insert: {
          answer_id: string
          decryption_key?: string | null
          id?: string
          question_id: string
          response: string
        }
        Update: {
          answer_id?: string
          decryption_key?: string | null
          id?: string
          question_id?: string
          response?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_responses_answers_id_fk"
            columns: ["answer_id"]
            referencedRelation: "answers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_responses_decryption_keys_id_fk"
            columns: ["decryption_key"]
            referencedRelation: "decryption_keys"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_responses_questions_id_fk"
            columns: ["question_id"]
            referencedRelation: "questions"
            referencedColumns: ["id"]
          }
        ]
      }
      user_telegrams: {
        Row: {
          id: string
          telegram_id: string
          user_id: string
        }
        Insert: {
          id?: string
          telegram_id: string
          user_id: string
        }
        Update: {
          id?: string
          telegram_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_telegrams_users_id_fk"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_wallets: {
        Row: {
          address: string
          created_at: string
          id: string
          mnemonic: string
          private_key: string
          updated_at: string
          user_id: string
        }
        Insert: {
          address: string
          created_at?: string
          id?: string
          mnemonic: string
          private_key: string
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string
          created_at?: string
          id?: string
          mnemonic?: string
          private_key?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_wallets_users_id_fk"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      wallet: {
        Row: {
          address: string
          createdAt: string
          id: string
          mnemonic: string
          privateKey: string
          updatedAt: string
        }
        Insert: {
          address: string
          createdAt?: string
          id?: string
          mnemonic: string
          privateKey: string
          updatedAt?: string
        }
        Update: {
          address?: string
          createdAt?: string
          id?: string
          mnemonic?: string
          privateKey?: string
          updatedAt?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      AttachmentType: "IMAGE" | "VIDEO" | "DOCUMENT"
      order_status:
        | "CREATED"
        | "PAID"
        | "PROCESSING"
        | "SHIPPED"
        | "DELIVERED"
        | "CANCELLED"
      purchase_status: "CREATED" | "PAID"
      question_type: "TEXT" | "MULTIPLE_CHOICE" | "FILE"
      reaction_type: "Responder" | "SideEffect" | "NonResponder"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

