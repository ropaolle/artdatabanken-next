export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      gender: {
        Row: {
          created_at: string
          id: string
          label: string | null
        }
        Insert: {
          created_at?: string
          id: string
          label?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          label?: string | null
        }
        Relationships: []
      }
      images: {
        Row: {
          created_at: string
          filename: string | null
          id: string
          thumbnail_url: string | null
          updated_at: string
          url: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          filename?: string | null
          id?: string
          thumbnail_url?: string | null
          updated_at?: string
          url?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          filename?: string | null
          id?: string
          thumbnail_url?: string | null
          updated_at?: string
          url?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "images_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      posts: {
        Row: {
          content: string | null
          created_at: string
          id: number
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      species: {
        Row: {
          county: string | null
          created_at: string
          date: string | null
          family: string | null
          gender: string[] | null
          id: string
          image: string | null
          kingdom: string | null
          latin_name: string | null
          place: string | null
          species: string | null
          taxonomy_order: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          county?: string | null
          created_at?: string
          date?: string | null
          family?: string | null
          gender?: string[] | null
          id?: string
          image?: string | null
          kingdom?: string | null
          latin_name?: string | null
          place?: string | null
          species?: string | null
          taxonomy_order?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          county?: string | null
          created_at?: string
          date?: string | null
          family?: string | null
          gender?: string[] | null
          id?: string
          image?: string | null
          kingdom?: string | null
          latin_name?: string | null
          place?: string | null
          species?: string | null
          taxonomy_order?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "species_image_fkey"
            columns: ["image"]
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "species_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      todos: {
        Row: {
          created_at: string
          id: string
          is_complete: boolean | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_complete?: boolean | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_complete?: boolean | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "todos_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
