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
      images: {
        Row: {
          created_at: string
          filename: string | null
          height: number | null
          id: string
          mime_type: string | null
          thumbnail_url: string | null
          updated_at: string
          upscaled: boolean | null
          url: string | null
          user_id: string | null
          width: number | null
        }
        Insert: {
          created_at?: string
          filename?: string | null
          height?: number | null
          id?: string
          mime_type?: string | null
          thumbnail_url?: string | null
          updated_at?: string
          upscaled?: boolean | null
          url?: string | null
          user_id?: string | null
          width?: number | null
        }
        Update: {
          created_at?: string
          filename?: string | null
          height?: number | null
          id?: string
          mime_type?: string | null
          thumbnail_url?: string | null
          updated_at?: string
          upscaled?: boolean | null
          url?: string | null
          user_id?: string | null
          width?: number | null
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
      species: {
        Row: {
          county: string | null
          created_at: string
          date: string | null
          family: string | null
          gender: string[] | null
          id: string
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
            foreignKeyName: "species_user_id_fkey"
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
